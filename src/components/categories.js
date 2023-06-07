import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories, } from '../slices/categoriesSlice'; // Replace with the correct path to your categories slice file
import { fetchProductsByCategory, fetchProducts } from '../slices/productsSlice';

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);




    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryClick = (category) => {
        dispatch(fetchProductsByCategory(category));
    };

    const handleAllProducts = () => {
        dispatch(fetchProducts())
    };





    return (
        <div className='categoriesContainer'>
            {categories.loading ? (
                <p>Loading categories...</p>
            ) : categories.error ? (
                <p>Error fetching categories: {categories.error}</p>
            ) : (
                <div className='categories'>
                    <button onClick={handleAllProducts}>All Products</button>
                    {categories.map((category) => (
                        <button value={category} onClick={(e) => handleCategoryClick(e.target.value)} key={category}>{category}</button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;