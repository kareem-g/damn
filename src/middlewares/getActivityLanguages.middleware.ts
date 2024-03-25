import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}

export const getActivityLanguages = createAsyncThunk<
  any,
  string,
  {rejectValue: FetchError}
>('getActivityLanguages', async (uuid, {rejectWithValue}) => {
  try {
    const response = await http.get(`/activities/${uuid}/languages`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue({errorMessage: error});
  }
});
