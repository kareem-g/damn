import {createAsyncThunk} from '@reduxjs/toolkit';
import {ICity} from 'models/city';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const getAllCities = createAsyncThunk<
  ICity[],
  undefined,
  {rejectValue: FetchError}
>('getAllCities', async (_, {rejectWithValue}) => {
  try {
    const response = await http.get<ICity[]>(`/cities`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    return rejectWithValue({errorMessage: error});
  }
});
