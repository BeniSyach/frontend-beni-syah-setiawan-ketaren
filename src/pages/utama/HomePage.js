import React, { useState, useEffect } from "react";
import ProductList from "../../components/ProductList";
import ProductForm from "../../components/ProductForm";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { createProduct, getProducts } from "../../api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    alert(`You ordered ${product.name}!`);
  };

  const handleAddProduct = async (product) => {
    const newProduct = await createProduct(product, token);
    setProducts([...products, newProduct]);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("");
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        setToken={setToken}
        setUserRole={setUserRole}
      />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Marketplace Merah Kuning Hijau
        </h1>

        {isLoggedIn ? (
          <>
            {userRole === "merchant" && (
              <ProductForm onSubmit={handleAddProduct} />
            )}
          </>
        ) : (
          <></>
        )}

        <ProductList
          products={products}
          onOrder={handleOrder}
          isLoggedIn={isLoggedIn}
          token={token}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
