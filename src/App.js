import React, { useEffect, useState } from 'react';
import { getProducts, createProduct } from './api';
import ProductList from './components/ProductList';
import LoginForm from './components/LoginForm';
import ProductForm from './components/ProductForm';

const App = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    console.log('Ordering product:', product);
    alert(`You ordered ${product.name}!`);
  };

  const handleAddProduct = async (product) => {
    const newProduct = await createProduct(product, token);
    setProducts([...products, newProduct]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace Merah Kuning Hijau</h1>
      {isLoggedIn ? (
        <>
          <button onClick={() => { setToken(''); localStorage.removeItem('token'); setIsLoggedIn(false); setUserRole(''); }} className="bg-red-500 text-white p-2 mb-4">
            Logout
          </button>
          {userRole === 'merchant' && <ProductForm onSubmit={handleAddProduct} />}
        </>
      ) : (
        <LoginForm setToken={(token) => { setToken(token); setIsLoggedIn(true); }} setUserRole={setUserRole} />
      )}
      <ProductList products={products} onOrder={handleOrder} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default App;
