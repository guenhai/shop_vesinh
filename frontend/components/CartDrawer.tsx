import React from 'react';
import { useCart } from '../services/cartContext';
import { SHOP_CONFIG } from '../constants';
import { formatCurrency } from './Formatters';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, toggleCart, updateQuantity, removeFromCart, totalAmount } = useCart();

  if (!isCartOpen) return null;

  const handleSendZalo = () => {
    if (items.length === 0) return;

    let message = `Chào ${SHOP_CONFIG.name}, tôi muốn xin báo giá chi tiết đơn hàng dự toán:\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.code})\n   SL: ${item.quantity} x ${formatCurrency(item.price)}\n`;
    });
    message += `\nTổng dự toán: ${formatCurrency(totalAmount)}`;
    message += `\n\nTôi đang quan tâm các sản phẩm này, vui lòng tư vấn thêm.`;

    const encodedMessage = encodeURIComponent(message);
    const zaloLink = `https://zalo.me/${SHOP_CONFIG.zaloId}?text=${encodedMessage}`;
    window.open(zaloLink, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${SHOP_CONFIG.phone}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity" 
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-file-invoice-dollar"></i>
            Bảng Dự Toán
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-blue-700 rounded-full">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <i className="fas fa-shopping-basket text-4xl mb-3 text-gray-300"></i>
              <p>Chưa có sản phẩm nào trong bảng tính.</p>
              <button onClick={toggleCart} className="mt-4 text-blue-600 font-medium hover:underline">
                Tiếp tục xem sản phẩm
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">Mã: {item.code}</p>
                  <div className="text-blue-600 font-bold text-sm">
                    {formatCurrency(item.price)}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >-</button>
                      <span className="px-2 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i> Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t p-4 bg-gray-50 space-y-3">
          <div className="flex justify-between items-end mb-2">
            <span className="text-gray-600 font-medium">Tổng ước tính:</span>
            <span className="text-2xl font-bold text-blue-700">{formatCurrency(totalAmount)}</span>
          </div>
          
          <button 
            onClick={handleSendZalo}
            disabled={items.length === 0}
            className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 ${
              items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
            }`}
          >
            <i className="fas fa-paper-plane"></i>
            Gửi Báo Giá Qua Zalo
          </button>
          
          <button 
            onClick={handleCall}
            className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center gap-2"
          >
            <i className="fas fa-phone-alt"></i>
            Gọi Tư Vấn Ngay
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-2">
            * Bảng giá này chỉ là ước tính tham khảo. Giá thực tế có thể thay đổi tùy thời điểm.
          </p>
        </div>
      </div>
    </div>
  );
};