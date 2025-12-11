import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './services/cartContext';
import { ProductProvider } from './services/productContext';
import { ToastProvider } from './services/toastContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';

// Animation styles
const GlobalStyles = () => (
  <style>{`
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes bounceIn {
      0% { opacity: 0; transform: translateY(20px); }
      50% { opacity: 1; transform: translateY(-5px); }
      100% { transform: translateY(0); }
    }
    .animate-slide-in-right {
      animation: slideIn 0.3s ease-out forwards;
    }
    .animate-bounce-in {
      animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
  `}</style>
);

const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <ToastProvider>
          <GlobalStyles />
          <HashRouter>
            <div className="min-h-screen flex flex-col bg-slate-50">
              <Navbar />
              <CartDrawer />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
              
              <footer className="bg-white border-t py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                  <p className="mb-2">© 2025 Kho Tổng Vệ Sinh Việt.</p>
                  <p>Hệ thống dự toán chi phí xây dựng tiện lợi.</p>
                </div>
              </footer>
            </div>
          </HashRouter>
        </ToastProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;