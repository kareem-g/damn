import {createAsyncThunk} from '@reduxjs/toolkit';
import {IGroupSlots} from 'models/tourGroups';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
interface Props {
  items: {
    type: string;
    product_identifier: string;
    quantity: number;
    language?: string;
    pickup?: string;
  }[];
  cartUuid: string;
}
export const addProductToMusementCart = createAsyncThunk<
  IGroupSlots,
  Props,
  {rejectValue: FetchError}
>('addProductToMusementCart', async (data: Props, thunkApi) => {
  try {
    const response = await http.post<unknown, {data: IGroupSlots}>(
      `/carts/` + data.cartUuid + '/items',
      JSON.stringify(data.items)
    );
    return await response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
