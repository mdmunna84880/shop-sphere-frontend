import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchAllProducts, 
  fetchProductById, 
  fetchCategories, 
  fetchProductsByCategory 
} from '../../services/api';
import type { Product } from '../../types/product.types';

// 1. State Interface
interface ProductState {
  items: Product[];                
  selectedProduct: Product | null; 
  categories: string[];            
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// 2. Initial State
const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  categories: [],
  status: 'idle',
  error: null,
};

// 3. Thunks (Async Actions)

export const getProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);

export const getProductDetails = createAsyncThunk(
  'products/fetchDetails',
  async (id: number) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const getCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

export const getProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category: string) => {
    const response = await fetchProductsByCategory(category);
    return response;
  }
);

// 4. Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Handle getProducts ---
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })

      // --- Handle getProductDetails ---
      .addCase(getProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductDetails.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product details';
      })

      // --- Handle getCategories (IMPROVED) ---
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })

      // --- Handle getProductsByCategory ---
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to filter products';
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;