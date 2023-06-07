import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchProductsByTitle,
  selectProducts,
  selectSearchResults,
} from '../slices/productsSlice';
import { setSearchResultsToProducts } from '../slices/productsSlice';


const ProductSearch = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

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
