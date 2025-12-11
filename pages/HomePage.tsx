import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Category, Product, FilterState } from '../types';
import { useCart } from '../services/cartContext';
import { useProducts } from '../services/productContext';
import { useToast } from '../services/toastContext';
import { formatCurrency } from '../components/Formatters';

export const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    minPrice: 0,
    maxPrice: 50000000,
    sort: 'popular'
  });

  const categories = Object.values(Category);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                            p.code.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'All' || p.category === filters.category;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (filters.sort === 'asc') return a.price - b.price;
      if (filters.sort === 'desc') return b.price - a.price;
      return (Number(b.isPopular) - Number(a.isPopular));
    });
  }, [filters, products]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào dự toán`);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12 px-4 mb-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Thiết Bị Vệ Sinh Giá Kho</h1>
          <p className="text-blue-100 text-lg">Dự toán chi phí xây dựng nhanh chóng - Không cần đăng ký</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fas fa-search text-gray-400"></i>
            </span>
            <input 
              type="text"
              placeholder="Tìm tên sản phẩm, mã số..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setFilters({...filters, category: 'All'})}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === 'All' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Tất cả
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilters({...filters, category: cat})}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filters.category === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex justify-end">
            <select 
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 outline-none"
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value as any})}
            >
              <option value="popular">Phổ biến nhất</option>
              <option value="asc">Giá: Thấp đến Cao</option>
              <option value="desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
                key={product.id} 
                onClick={() => handleCardClick(product.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col cursor-pointer group"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold">Hết hàng</span>
                  </div>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                    Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-1">{product.category} • {product.code}</div>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">{product.name}</h3>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-blue-700">{formatCurrency(product.price)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                    )}
                  </div>

                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={!product.inStock}
                    className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      product.inStock 
                        ? 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <i className="fas fa-plus-circle"></i>
                    Thêm vào dự toán
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-300 text-6xl mb-4">
              <i className="fas fa-box-open"></i>
            </div>
            <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào.</p>
            <button 
              onClick={() => setFilters({...filters, search: '', category: 'All'})}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};