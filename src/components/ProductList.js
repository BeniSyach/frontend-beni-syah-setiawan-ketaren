import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onOrder, isLoggedIn }) => {
    return (
        <ul>
            {products.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onOrder={onOrder}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </ul>
    );
};

export default ProductList;
