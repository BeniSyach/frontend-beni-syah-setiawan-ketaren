import React, { useState } from "react";
import { createTransaction } from "../api";
import QuantityModal from "./QuantityModal";

const ProductList = ({ products, isLoggedIn, token }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOrder = async (quantity) => {
    if (!isLoggedIn) {
      alert("Anda harus login untuk melakukan pemesanan.");
      return;
    }

    try {
      const transactionData = {
        productId: selectedProduct.id,
        quantity: quantity,
      };

      const result = await createTransaction(transactionData, token);
      alert(`Pesanan berhasil!`);
      setModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={product.imageUrl || "https://via.placeholder.com/150"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">Harga: Rp.{product.price}</p>
            <p className="text-gray-500 mt-2">{product.description}</p>
            {isLoggedIn ? (
              <button
                onClick={() => openModal(product)} // Buka modal ketika tombol diklik
                className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-600 transition duration-300"
              >
                Pesan Sekarang
              </button>
            ) : (
              <p className="text-red-500 mt-4">Login Untuk Memesan barang</p>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <QuantityModal
          product={selectedProduct}
          onClose={() => setModalOpen(false)}
          onConfirm={handleOrder}
        />
      )}
    </div>
  );
};

export default ProductList;
