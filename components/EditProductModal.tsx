import React, { useState, useEffect, useRef } from 'react';
import { Product, Category } from '../types';

interface EditProductModalProps {
  product: Product | null; // null means "Create Mode"
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
}

const INITIAL_STATE: Omit<Product, 'id'> = {
  name: '',
  code: '',
  price: 0,
  originalPrice: 0,
  category: Category.TOILET,
  description: '',
  image: '',
  images: [],
  inStock: true,
  isPopular: false
};

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(INITIAL_STATE);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
            ...product,
            // Ensure images array exists, fallback to single image if missing
            images: product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : [])
        });
      } else {
        setFormData({ ...INITIAL_STATE });
      }
      setImageUrlInput('');
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Sync formData.image (thumbnail) with first item of formData.images
  const updateImages = (newImages: string[]) => {
      setFormData({
          ...formData,
          images: newImages,
          image: newImages.length > 0 ? newImages[0] : ''
      });
  };

  const handleAddUrl = () => {
      if (imageUrlInput.trim()) {
          updateImages([...(formData.images || []), imageUrlInput.trim()]);
          setImageUrlInput('');
      }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          
          // Check file size (limit to ~500KB for localStorage performance)
          if (file.size > 500000) {
              alert("Vui lòng chọn ảnh nhỏ hơn 500KB để đảm bảo hiệu suất trang web (vì đang lưu trên trình duyệt).");
              return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              updateImages([...(formData.images || []), base64String]);
          };
          reader.readAsDataURL(file);
      }
  };

  const removeImage = (index: number) => {
      const newImages = [...(formData.images || [])];
      newImages.splice(index, 1);
      updateImages(newImages);
  };

  const setAsThumbnail = (index: number) => {
      const newImages = [...(formData.images || [])];
      const selected = newImages[index];
      // Move selected to front
      newImages.splice(index, 1);
      newImages.unshift(selected);
      updateImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const isEditMode = !!product;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh]">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h3 className="font-bold text-lg text-gray-800">
            {isEditMode ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
                    <input 
                    type="text" 
                    required
                    className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Ví dụ: Bồn cầu 1 khối..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mã SKU <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        required
                        className="w-full border rounded-md p-2 bg-gray-50"
                        value={formData.code}
                        onChange={e => setFormData({...formData, code: e.target.value})}
                        placeholder="BC-001"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                    <select 
                        className="w-full border rounded-md p-2"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value as Category})}
                    >
                        {Object.values(Category).map(c => (
                        <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán <span className="text-red-500">*</span></label>
                        <input 
                            type="number" 
                            required
                            min="0"
                            className="w-full border rounded-md p-2"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc</label>
                        <input 
                            type="number" 
                            min="0"
                            className="w-full border rounded-md p-2"
                            value={formData.originalPrice || ''}
                            onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                        <input 
                            type="checkbox"
                            checked={formData.inStock}
                            onChange={e => setFormData({...formData, inStock: e.target.checked})}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700">Đang còn hàng (In Stock)</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                        <input 
                            type="checkbox"
                            checked={formData.isPopular || false}
                            onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700">Sản phẩm Nổi Bật (Hot)</span>
                    </label>
                </div>
            </div>
          </div>
          
          {/* Image Manager Section */}
          <div className="border-t pt-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Quản lý Hình ảnh (Gallery)</label>
              
              {/* Add Controls */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1 flex gap-2">
                      <input 
                          type="text" 
                          className="flex-1 border rounded-md p-2 text-sm"
                          value={imageUrlInput}
                          onChange={e => setImageUrlInput(e.target.value)}
                          placeholder="Dán URL ảnh vào đây..."
                      />
                      <button 
                          type="button" 
                          onClick={handleAddUrl}
                          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 border"
                      >
                          <i className="fas fa-link"></i> Thêm URL
                      </button>
                  </div>
                  <div className="relative">
                      <input 
                          type="file" 
                          accept="image/*"
                          ref={fileInputRef}
                          className="hidden" 
                          onChange={handleFileUpload}
                      />
                      <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full sm:w-auto bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 border border-blue-200 font-medium"
                      >
                          <i className="fas fa-cloud-upload-alt mr-2"></i> Tải ảnh lên
                      </button>
                  </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 min-h-[100px]">
                  {(!formData.images || formData.images.length === 0) && (
                      <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-4">
                          <i className="fas fa-images text-2xl mb-2"></i>
                          <span className="text-sm">Chưa có ảnh nào</span>
                      </div>
                  )}
                  {formData.images?.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square bg-white rounded-lg border shadow-sm overflow-hidden">
                          <img src={img} alt={`Img ${idx}`} className="w-full h-full object-cover" />
                          
                          {/* Overlay Actions */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                              {idx !== 0 && (
                                  <button 
                                      type="button"
                                      onClick={() => setAsThumbnail(idx)}
                                      className="bg-white/90 text-blue-600 text-xs font-bold px-2 py-1 rounded hover:bg-white"
                                      title="Đặt làm ảnh đại diện"
                                  >
                                      Làm Cover
                                  </button>
                              )}
                              {idx === 0 && (
                                  <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                      Thumbnail
                                  </span>
                              )}
                              <button 
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                  title="Xóa ảnh"
                              >
                                  <i className="fas fa-trash-alt text-xs"></i>
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
            <textarea 
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Thông số kỹ thuật, xuất xứ, bảo hành..."
            />
          </div>
        </form>

        <div className="p-4 border-t bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!formData.name || !formData.price}
            className={`px-6 py-2 rounded-lg font-medium shadow flex items-center gap-2 ${
                (!formData.name || !formData.price) 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <i className="fas fa-save"></i>
            {isEditMode ? 'Lưu Thay Đổi' : 'Tạo Sản Phẩm'}
          </button>
        </div>
      </div>
    </div>
  );
};