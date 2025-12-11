import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  resetData: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products_data');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Failed to parse products from local storage");
        setProducts(MOCK_PRODUCTS);
      }
    } else {
      setProducts(MOCK_PRODUCTS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('products_data', JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    // Generate a simple ID based on timestamp
    const productWithId: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetData = () => {
    if (window.confirm("Bạn có chắc muốn khôi phục dữ liệu gốc? Mọi thay đổi sẽ bị mất.")) {
      setProducts(MOCK_PRODUCTS);
      localStorage.removeItem('products_data');
      window.location.reload();
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};