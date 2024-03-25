import {createAsyncThunk} from '@reduxjs/toolkit';

import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const putCartCustomerData = createAsyncThunk<
  any,
  {cartUuid: any; email: string; firstname: string; lastname: string},
  {rejectValue: FetchError}
>(
  'cart/putCartCustomerData',
  async ({cartUuid, email, firstname, lastname}, {rejectWithValue}) => {
    try {
      const response = await http.put<any>(`/carts/${cartUuid}/customer`, {
        email,
        firstname,
        lastname,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({errorMessage: error});
    }
  }
);
