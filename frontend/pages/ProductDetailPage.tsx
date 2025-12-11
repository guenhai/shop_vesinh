import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../services/productContext';
import { useCart } from '../services/cartContext';
import { useToast } from '../services/toastContext';
import { formatCurrency } from '../components/Formatters';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart, toggleCart } = useCart();
  const { showToast } = useToast();

  const product = products.find(p => p.id === id);
  
  // Gallery state
  const [activeImage, setActiveImage] = useState<string>('');

  // Initialize active image when product loads
  useEffect(() => {
    if (product) {
        setActiveImage(product.image);
    }
  }, [product]);

  // Handle case where product might use "image" or "images"
  const galleryImages = product ? (product.images && product.images.length > 0 ? product.images : [product.image]) : [];

  // Related products logic (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="text-gray-300 text-6xl mb-4">
            <i className="fas fa-search"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h2>
        <p className="text-gray-500 mb-6">Sản phẩm bạn đang tìm kiếm có thể đã bị xóa hoặc đường dẫn không đúng.</p>
        <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
            Quay về trang chủ
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào dự toán`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    toggleCart(); // Open cart drawer
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20 animate-slide-in-right">
       {/* Breadcrumb */}
       <div className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-2">
         <Link to="/" className="hover:text-blue-600 transition-colors">
            <i className="fas fa-home mr-1"></i> Trang chủ
         </Link>
         <span>/</span>
         <span className="text-gray-900 font-medium">{product.category}</span>
         <span>/</span>
         <span className="truncate max-w-[150px] sm:max-w-xs text-gray-400">{product.name}</span>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
         {/* Gallery Section */}
         <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden relative group aspect-square flex items-center justify-center">
                <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                />
                {product.isPopular && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                        <i className="fas fa-star mr-1"></i> BÁN CHẠY
                    </div>
                )}
            </div>
            
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {galleryImages.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                activeImage === img 
                                ? 'border-blue-600 shadow-md ring-2 ring-blue-100' 
                                : 'border-transparent hover:border-gray-300 bg-gray-50'
                            }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover"/>
                        </button>
                    ))}
                </div>
            )}
         </div>

         {/* Info Section */}
         <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 border-b border-gray-100 pb-4">
               <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono font-bold text-gray-600">SKU: {product.code}</span>
               <span className="w-px h-4 bg-gray-300"></span>
               <span className={product.inStock ? "text-green-600 font-bold flex items-center gap-1" : "text-red-500 font-bold flex items-center gap-1"}>
                 {product.inStock ? <><i className="fas fa-check-circle"></i> Còn hàng</> : <><i className="fas fa-times-circle"></i> Hết hàng</>}
               </span>
            </div>

            <div className="mb-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
               <div className="flex items-end gap-3 flex-wrap">
                 <span className="text-3xl sm:text-4xl font-bold text-blue-700">{formatCurrency(product.price)}</span>
                 {product.originalPrice && product.originalPrice > product.price && (
                   <span className="text-lg text-gray-400 line-through mb-1.5">
                     {formatCurrency(product.originalPrice)}
                   </span>
                 )}
               </div>
               {product.originalPrice && product.originalPrice > product.price && (
                 <div className="mt-2 inline-flex items-center gap-1 text-sm text-red-600 font-bold bg-white px-2 py-1 rounded border border-red-100">
                   <i className="fas fa-tag"></i>
                   Tiết kiệm: {formatCurrency(product.originalPrice - product.price)}
                 </div>
               )}
            </div>

            <div className="prose text-gray-600 mb-8 flex-1">
               <h3 className="text-lg font-bold text-gray-800 mb-2 border-l-4 border-blue-600 pl-3">Mô tả sản phẩm</h3>
               <p className="whitespace-pre-line leading-relaxed text-sm md:text-base">
                   {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
               </p>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 sticky bottom-0 bg-white sm:static pb-4 sm:pb-0 z-20">
               <button 
                 onClick={handleAddToCart}
                 disabled={!product.inStock}
                 className={`flex-1 py-3.5 px-6 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 text-base ${
                   product.inStock 
                   ? "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95" 
                   : "border-gray-200 text-gray-400 cursor-not-allowed"
                 }`}
               >
                 <i className="fas fa-cart-plus"></i>
                 Thêm vào dự toán
               </button>
               <button 
                 onClick={handleBuyNow}
                 disabled={!product.inStock}
                 className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 text-base ${
                    product.inStock 
                    ? "bg-blue-600 hover:bg-blue-700 active:scale-95" 
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
               >
                 <i className="fas fa-clipboard-check"></i>
                 Xem Bảng Dự Toán
               </button>
            </div>
         </div>
       </div>

       {/* Related Products */}
       {relatedProducts.length > 0 && (
         <div className="mt-16 pt-8 border-t border-gray-200">
           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
               <i className="fas fa-th-large text-blue-600"></i> Sản phẩm cùng loại
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {relatedProducts.map(rp => (
               <Link to={`/product/${rp.id}`} key={rp.id} className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all">
                 <div className="aspect-square bg-gray-100 overflow-hidden relative">
                   <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                   {rp.originalPrice && rp.originalPrice > rp.price && (
                      <span className="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          -{Math.round((1 - rp.price / rp.originalPrice) * 100)}%
                      </span>
                   )}
                 </div>
                 <div className="p-3">
                   <div className="text-xs text-gray-500 mb-1 truncate">{rp.code}</div>
                   <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">{rp.name}</h4>
                   <div className="font-bold text-blue-600">{formatCurrency(rp.price)}</div>
                 </div>
               </Link>
             ))}
           </div>
         </div>
       )}
    </div>
  );
};