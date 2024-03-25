import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const getSpecificOrderData = createAsyncThunk<
  any,
  {order_uuid: string},
  {
    rejectValue: FetchError;
  }
>(
  'getSpecificOrderData',
  async (data: {order_uuid: string}, {rejectWithValue}) => {
    try {
      const response = await http.get(`/orders/` + data.order_uuid);

      return response.data;
    } catch (error) {
      return rejectWithValue(error as FetchError);
    }
  }
);
