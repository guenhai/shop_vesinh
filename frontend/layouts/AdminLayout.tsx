import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-wider">ADMIN PORTAL</h1>
                    <p className="text-xs text-slate-400 mt-1">Shop Vệ Sinh Manager</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        to="/admin"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin')
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <i className="fas fa-box-open"></i>
                        <span>Sản Phẩm</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/orders')
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <i className="fas fa-file-invoice-dollar"></i>
                        <span>Đơn Hàng</span>
                    </Link>
                    <div className="pt-8 px-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Hệ Thống</p>
                        <Link
                            to="/"
                            className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors py-2"
                        >
                            <i className="fas fa-external-link-alt"></i>
                            <span>Về Trang Web</span>
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Admin Topbar */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
                    <div className="md:hidden">
                        {/* Mobile menu trigger could go here */}
                        <span className="font-bold text-slate-800">Admin Portal</span>
                    </div>
                    <div className="hidden md:block">
                        {/* Breadcrumbs or Page Title could go here */}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                A
                            </div>
                            <span>Admin</span>
                        </div>
                    </div>
                </header>

                {/* Content Scrollable Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
