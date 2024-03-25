import {createAsyncThunk} from '@reduxjs/toolkit';

import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const putExtraCustomerData = createAsyncThunk<
  any,
  {
    cartUuid: any;
    extra_customer_data: any;
    email: string;
    firstName: string;
    lastName: string;
    nationality: string;
  },
  {rejectValue: FetchError}
>(
  'cart/putCartCustomerData',
  async (
    {cartUuid, extra_customer_data, email, firstName, lastName, nationality},
    {rejectWithValue}
  ) => {
    console.log(nationality);
    try {
      const response = await http.put<any>(`/carts/${cartUuid}/customer`, {
        firstname: firstName,
        lastname: lastName,
        email,
        ...(extra_customer_data && {extra_customer_data}),
      });
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({errorMessage: error});
    }
  }
);
