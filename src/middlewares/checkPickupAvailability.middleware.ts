import {createAsyncThunk} from '@reduxjs/toolkit';
import {OrderBoxElement} from 'models/enums/OrderBoxElement.enum';
import {ITour} from 'models/tour';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
interface Props {
  uuid: string;
}
export const checkPickupAvailability = createAsyncThunk<
  boolean,
  Props,
  {rejectValue: FetchError}
>('checkPickupAvailability', async (data: Props, thunkApi) => {
  try {
    const response = await http.get<ITour>(`/activities/` + data.uuid);
    const tour: ITour = await response.data;
    console.log('order box element', tour);
    return tour.order_box_elements.includes(
      OrderBoxElement.TOURS_WITH_PICKUP_POINTS
    )
      ? true
      : false;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
