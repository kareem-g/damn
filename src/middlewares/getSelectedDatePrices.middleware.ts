import {createAsyncThunk} from '@reduxjs/toolkit';
import {ITour} from 'models/tour';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
export interface IGetTour {
  uuid: string;
  tourDate: string;
  pickup?: string; // optional param
}

export const getTourDatePrices = createAsyncThunk<
  ITour,
  IGetTour,
  {rejectValue: FetchError}
>('getTourDatePrices', async (data: IGetTour, thunkApi) => {
  try {
    const response = await http.get<ITour>(
      `/activities/` +
        data.uuid +
        '/dates/' +
        data.tourDate +
        (data.pickup ? `?pickup=${data.pickup}` : '')
    );
    return await response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
