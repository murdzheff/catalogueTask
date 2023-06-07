import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  searchProductsByTitle,
} from '../slices/productsSlice';
import { setSearchResultsToProducts } from '../slices/productsSlice';


const ProductSearch = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  //search functionality together 
  //with equalizing the products shown with the search results
  const handleSearch = async () => {
    await dispatch(searchProductsByTitle(keyword));
    dispatch(setSearchResultsToProducts());
  };




  return (
    <div className='searchContainer'>
      <input placeholder='Search for items' type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ProductSearch;
