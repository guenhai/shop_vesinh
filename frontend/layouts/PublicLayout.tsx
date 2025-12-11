import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';

export const PublicLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <CartDrawer />
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-white border-t py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    <p className="mb-2">© 2025 Kho Tổng Vệ Sinh Việt.</p>
                    <p>Hệ thống dự toán chi phí xây dựng tiện lợi.</p>
                </div>
            </footer>
        </div>
    );
};
