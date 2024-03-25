import {createAsyncThunk} from '@reduxjs/toolkit';
import {IPickupPoint} from 'models/pickup';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
export interface IGetTour {
  uuid: string;
}

export const getTourPickupPoints = createAsyncThunk<
  IPickupPoint[],
  IGetTour,
  {rejectValue: FetchError}
>('getTourPickupPoints', async (data: IGetTour, thunkApi) => {
  try {
    const response = await http.get<IPickupPoint[]>(
      `/activities/` + data.uuid + '/pickups'
    );

    return (await response.data) as IPickupPoint[];
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
