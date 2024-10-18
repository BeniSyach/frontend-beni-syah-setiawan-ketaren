import React from 'react';

const ProductItem = ({ product, onOrder, isLoggedIn }) => {
    const handleOrder = () => {
        if (isLoggedIn) {
            onOrder(product);
        } else {
            alert('Please log in to make a purchase.');
        }
    };

    return (
        <li className="border p-4 mb-2 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
            </div>
            <button onClick={handleOrder} className="bg-blue-500 text-white p-2 ml-4">
                Order
            </button>
        </li>
    );
};

export default ProductItem;
