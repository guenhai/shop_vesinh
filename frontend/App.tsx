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
// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
// Auth
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';

// Animation styles
const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <ToastProvider>
          <HashRouter>
            <Routes>
              {/* Public Route Group */}
              <Route path="/login" element={<LoginPage />} />

              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
              </Route>

              {/* Admin Route Group (Protected) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminPage />} />
                  {/* Future routes: <Route path="orders" element={<OrdersPage />} /> */}
                </Route>
              </Route>
            </Routes>
          </HashRouter>
        </ToastProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;