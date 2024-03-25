import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
export interface IGetTour {
  uuid: string;
  pickupUuid?: string;
}

export const getTourAvailableDates = createAsyncThunk<
  string[],
  IGetTour,
  {rejectValue: FetchError}
>('getTourAvailableDates', async (data: IGetTour, thunkApi) => {
  try {
    const requestParams = {pickup: ''};
    if (data.pickupUuid) {
      requestParams.pickup = data.pickupUuid;
    }

    const response = await http.get<{day: string}[]>(
      `/activities/` + data.uuid + '/dates',
      {
        params: requestParams,
      }
    );
    // if (response.data.code === '1402') {
    //   return thunkApi.rejectWithValue(response.data);
    // }

    return await response.data.map((item: {day: string}) => item.day);
  } catch (error: any) {
    toast.error('Server Error, Please try again later!');

    if (error.response.status === 422) {
      toast.error('This Tour is SOLD OUT, Please Select Another tour!');
      console.log(error.response);
    }
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
