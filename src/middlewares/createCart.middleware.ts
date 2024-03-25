import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';
import {getCartCustomerDataSchema} from './getCartCustomerDataSchema.middleware';

interface FetchError {
  errorMessage: string | undefined;
}

export const createCart = createAsyncThunk<any, any, {rejectValue: FetchError}>(
  'createNewCart',
  async (data: any, {rejectWithValue, dispatch}) => {
    try {
      const response = await http.post<unknown, any>(`/carts`, {
        items: data,
      });
      const newCartUUID = response.data.uuid;

      if (response.status === 200) {
        localStorage.setItem('cartUUID', newCartUUID);
        dispatch(getCartCustomerDataSchema({cartUuid: newCartUUID}));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error as FetchError);
    }
  }
);
