import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

interface UpdateCartItemsRequest {
  type: string;
  product_identifier: string;
  quantity: number;
  // language: {name: string; code: string};
  pickup: string;
}

interface UpdateCartItemsResponse {
  items: [
    {
      productUuid: string;
      quantity: number;
      options?: {[key: string]: string};
    }
  ];
}

// Define an async action using createAsyncThunk
export const updateCartItems = createAsyncThunk<
  any,
  {cartUuid: string; items: UpdateCartItemsRequest[]},
  {rejectValue: FetchError}
>('cart/updateCartItems', async ({cartUuid, items}, {rejectWithValue}) => {
  try {
    const response = await http.post<unknown, {data: UpdateCartItemsResponse}>(
      `/carts/${cartUuid}/items`,
      JSON.stringify(items)
    );
    return response.data;
  } catch (error: any) {
    console.log('error', error);

    return rejectWithValue({errorMessage: error});
  }
});
