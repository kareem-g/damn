import {createAsyncThunk} from '@reduxjs/toolkit';

import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const putParticipantData = createAsyncThunk<
  any,
  {
    cartUuid: any;
    cartItemUuid: string;
    // email: string;
    // firstname: string;
    // lastname: string;
  },
  {rejectValue: FetchError}
>(
  'cart/putParticipantData',
  async ({cartUuid, cartItemUuid}, {rejectWithValue}) => {
    try {
      const response = await http.put<any>(
        `/carts/${cartUuid}/items/${cartItemUuid}/participants`,
        {}
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue({errorMessage: error});
    }
  }
);
