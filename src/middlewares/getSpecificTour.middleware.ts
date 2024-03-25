import {createAsyncThunk} from '@reduxjs/toolkit';

import {ITour} from 'models/tour';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
export interface IGetTour {
  uuid: string | null;
}

export const getSpecificTour = createAsyncThunk<
  ITour,
  IGetTour,
  {rejectValue: FetchError}
>('getSpecificTour', async (data: IGetTour, thunkApi) => {
  try {
    const response = await http.get<ITour>(`/activities/` + data.uuid, {
      params: data,
    });
    return await response.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
