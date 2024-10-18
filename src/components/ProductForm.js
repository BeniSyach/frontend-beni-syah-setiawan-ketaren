import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, price });
        setName('');
        setPrice('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 mb-2 w-full"
            />
            <input
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-green-500 text-white p-2 w-full">
                Add Product
            </button>
        </form>
    );
};

export default ProductForm;
