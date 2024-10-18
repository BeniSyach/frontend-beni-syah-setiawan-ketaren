import React, { useState } from "react";

const QuantityModal = ({ product, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Pesan {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Jumlah:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 mt-2 w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600 transition duration-300"
          >
            Konfirmasi
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default QuantityModal;
