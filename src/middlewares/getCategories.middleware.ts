import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const getCategories = createAsyncThunk<
  any,
  undefined,
  {rejectValue: FetchError}
>('getCategories', async (_: undefined, thunkApi) => {
  try {
    const response = await http.get(`/categories`);

    return await response.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
