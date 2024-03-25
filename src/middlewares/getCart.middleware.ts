import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';
import {getCartCustomerDataSchema} from './getCartCustomerDataSchema.middleware';

interface FetchError {
  errorMessage: string | undefined;
}
export const getCart = createAsyncThunk<any, string, {rejectValue: FetchError}>(
  'getCart',
  async (cartUuid, {rejectWithValue, dispatch}) => {
    try {
      const response = await http.get(`/carts/${cartUuid}`);
      if (response.status === 200) {
        dispatch(getCartCustomerDataSchema({cartUuid}));
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue({errorMessage: error});
    }
  }
);
