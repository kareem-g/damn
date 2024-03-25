import {createAsyncThunk} from '@reduxjs/toolkit';
import {ITourMedia} from 'models/tour';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
export interface IGetTour {
  uuid: string | null;
}

export const getTourMedia = createAsyncThunk<
  ITourMedia[],
  IGetTour,
  {rejectValue: FetchError}
>('getTourMedia', async (data: IGetTour, thunkApi) => {
  try {
    const response = await http.get<ITourMedia[]>(
      `/activities/` + data.uuid + '/media'
    );
    console.log(response.data);
    return await response.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
