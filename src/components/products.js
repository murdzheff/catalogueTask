import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectSearchResults } from '../slices/productsSlice'; // Replace with the correct path to your products slice file
import ProductSearch from './search';
import { addProduct, removeProduct } from '../slices/cartSlice';

const ProductsComponent = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const cart = useSelector((state) => state.cart);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleCart = (product) => {
        
        if (checkIfInCart(product.id)) {
            dispatch(removeProduct(product.id));
        } else {
            dispatch(addProduct(product));
        }
    };

    const checkIfInCart = (id) => {
        return cart.find((item) => item.id === id) !== undefined;
    };

    const openDialog = (product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedProduct(null);
        setDialogOpen(false);
    };

    return (
        <div>
            <ProductSearch ></ProductSearch>

            {products.loading ? (
                <p>Loading products...</p>
            ) : products.error ? (
                <p>Error fetching products: {products.error}</p>
            ) : (
                <div className='products'>
                    {products.map((product) => (
                        <div onClick={() => openDialog(product)}>
                            <img  key={product.id} src={product.image}></img>
                            <p className='title'>{product.title}</p>
                            <p>{product.category}</p>
                            <p>Price: ${product.price}</p>
                            <button className='cartBtn' onClick={(e) => {
                                 e.stopPropagation(); handleCart(product)}}>
                                {checkIfInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedProduct && (
                <div className={`dialog ${dialogOpen ? 'open' : ''}`}>
                    <div className='dialog-content'>
                        <button className='close-button' onClick={closeDialog}>
                            X
                        </button>
                        <h3>{selectedProduct.title}</h3>
                        <p>Price: ${selectedProduct.price}</p>
                        <p>{selectedProduct.description}</p>
                        {/* Add more information about the product */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsComponent;
