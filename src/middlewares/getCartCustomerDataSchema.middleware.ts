import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const getCartCustomerDataSchema = createAsyncThunk<
  any,
  {cartUuid: string},
  {rejectValue: FetchError}
>('cart/getCartCustomerDataSchema', async ({cartUuid}, {rejectWithValue}) => {
  try {
    const response = await http.get(`/carts/${cartUuid}/customer/schema`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue({errorMessage: error});
  }
});
