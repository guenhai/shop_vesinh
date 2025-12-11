import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useProducts } from '../services/productContext';
import { useToast } from '../services/toastContext';
import { formatCurrency } from '../components/Formatters';
import { Link } from 'react-router-dom';
import { EditProductModal } from '../components/EditProductModal';

// Simple PIN for demo purposes
const ADMIN_PIN = "1234";

export const AdminPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetData } = useProducts();
  const { showToast } = useToast();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  
  // Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check session storage on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_auth', 'true');
        showToast("Đăng nhập thành công!", "success");
    } else {
        showToast("Mã PIN không đúng", "error");
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('admin_auth');
  };

  const toggleStock = (product: Product) => {
    const updated = { ...product, inStock: !product.inStock };
    updateProduct(updated);
    showToast(`Đã cập nhật trạng thái kho: ${updated.code}`);
  };

  const handleDelete = (id: string, name: string) => {
      if(window.confirm(`Bạn có chắc muốn xóa sản phẩm "${name}"?`)) {
          deleteProduct(id);
          showToast(`Đã xóa sản phẩm ${name}`, "info");
      }
  };

  // Open modal for Create (product = null)
  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
        // Edit Mode
        updateProduct(productData);
        showToast("Đã cập nhật sản phẩm thành công!");
    } else {
        // Create Mode
        addProduct(productData);
        showToast("Đã thêm sản phẩm mới thành công!");
    }
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
      return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
              <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      <i className="fas fa-user-shield"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng Nhập Quản Trị</h2>
                  <p className="text-gray-500 mb-6 text-sm">Nhập mã PIN để truy cập. (Gợi ý: 1234)</p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                      <input 
                        type="password" 
                        inputMode="numeric"
                        className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="••••"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        maxLength={4}
                      />
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                          Truy Cập
                      </button>
                  </form>
                  <Link to="/" className="block mt-6 text-sm text-gray-400 hover:text-blue-600">
                      ← Quay về trang chủ
                  </Link>
              </div>
          </div>
      );
  }

  // --- ADMIN DASHBOARD VIEW ---
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Quản Lý Sản Phẩm</h1>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Admin</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Tổng số: {products.length} sản phẩm
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
            <button 
                onClick={handleAddClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center"
            >
                <i className="fas fa-plus mr-2"></i> Thêm Sản Phẩm
            </button>
            <button 
                onClick={resetData}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
                <i className="fas fa-undo mr-1"></i> Reset
            </button>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Hình ảnh</th>
                <th className="px-6 py-4">Tên & Mã</th>
                <th className="px-6 py-4">Giá bán</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 w-20">
                    <img src={product.image} alt="" className="w-12 h-12 rounded object-cover bg-gray-200 border" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">SKU: {product.code}</div>
                    {product.isPopular && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded mt-1 inline-block">HOT</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {formatCurrency(product.price)}
                    {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">
                            {formatCurrency(product.originalPrice)}
                        </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200 whitespace-nowrap">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => toggleStock(product)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer select-none ${
                        product.inStock 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => handleEditClick(product)}
                            className="text-blue-600 hover:bg-blue-50 w-8 h-8 flex items-center justify-center rounded transition-colors"
                            title="Chỉnh sửa"
                        >
                        <i className="fas fa-edit"></i>
                        </button>
                        <button 
                            onClick={() => handleDelete(product.id, product.name)}
                            className="text-red-500 hover:bg-red-50 w-8 h-8 flex items-center justify-center rounded transition-colors"
                            title="Xóa sản phẩm"
                        >
                        <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow mt-4">
              <p className="text-gray-500">Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!</p>
          </div>
      )}

      <EditProductModal 
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};