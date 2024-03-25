import {createAsyncThunk} from '@reduxjs/toolkit';

import {IGroupSlots} from 'models/tourGroups';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
interface Props {
  uuid: string;
  date: string;
}
export const getTourGroupSlots = createAsyncThunk<
  IGroupSlots,
  Props,
  {rejectValue: FetchError}
>('getTourGroupSlots', async (data: Props, thunkApi) => {
  try {
    const response = await http.post<IGroupSlots>(
      `/activities/${data.uuid}/dates/${data.date}`
    );
    return (await response.data) as IGroupSlots;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
