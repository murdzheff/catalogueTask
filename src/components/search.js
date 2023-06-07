import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProductsByTitle } from '../slices/productsSlice';
import { setSearchResultsToProducts } from '../slices/productsSlice';

const ProductSearch = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearch = async () => {
    await dispatch(searchProductsByTitle(keyword));
    dispatch(setSearchResultsToProducts());
  };

  const debouncedSearch = debounce(handleSearch, 500);

  return (
    <div className='searchContainer'>
      <input
        placeholder='Search for items'
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          debouncedSearch();
        }}
      />
    </div>
  );
};

export default ProductSearch;
