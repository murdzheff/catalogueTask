import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
});

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await response.json();
    return data;
  }
);

export const searchProductsByTitle = createAsyncThunk('products/search', async (searchInput) => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  console.log(filteredData)
  return filteredData;
});

const initialState = {
  products: [],
  searchResults: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
      setSearchResultsToProducts: (state) => {
        state.products = state.searchResults;
      },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProductsByTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { searchProducts } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectSearchResults = (state) => state.products.searchResults;
export const { setSearchResultsToProducts } = productsSlice.actions;


export default productsSlice.reducer;