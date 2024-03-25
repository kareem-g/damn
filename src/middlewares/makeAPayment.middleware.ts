import {createAsyncThunk} from '@reduxjs/toolkit';

import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const makeAPayment = createAsyncThunk<
  string,
  {order_uuid: string},
  {
    rejectValue: FetchError;
  }
>('makeAPayment', async (data, {rejectWithValue}) => {
  try {
    const response = await http.post(`/payments/no/payment`, {
      uuid: data.order_uuid,
    });
    return response.data.uuid as string;
  } catch (error) {
    return rejectWithValue(error as FetchError);
  }
});
