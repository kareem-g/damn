import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const getParticipantInformation = createAsyncThunk<
  any,
  {cartUuid: string; cartItemUuid: string},
  {rejectValue: FetchError}
>(
  'cart/getParticipantInformation',
  async ({cartUuid, cartItemUuid}, {rejectWithValue}) => {
    try {
      const response = await http.get(
        `/carts/${cartUuid}/items/${cartItemUuid}/participants/schema`
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({errorMessage: error});
    }
  }
);
