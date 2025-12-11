import React from 'react';
import { useCart } from '../services/cartContext';
import { SHOP_CONFIG } from '../constants';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-water text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 leading-none text-lg">Vệ Sinh Việt</span>
              <span className="text-xs text-gray-500 font-medium">Kho Giá Gốc</span>
            </div>
          </Link>

          {/* Desktop Menu - Simplified for MVP */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Trang chủ</Link>
            <a href={`tel:${SHOP_CONFIG.phone}`} className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
              <i className="fas fa-phone-alt text-sm"></i> Hotline: {SHOP_CONFIG.phone}
            </a>
          </div>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <i className="fas fa-clipboard-list text-2xl"></i>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full min-w-[20px]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};