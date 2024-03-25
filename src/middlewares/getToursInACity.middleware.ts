import {createAsyncThunk} from '@reduxjs/toolkit';
import http from 'utils/http';

interface FetchError {
  errorMessage: string | undefined;
}
export interface IGetTours {
  offset?: string;
  currency?: string;
  lat?: number;
  long?: number;
  feature?: string;
  country?: string;
  currency_data?: string;
  sort_by?: string;
  query?: string;
  category?: string;
  limit?: number;
  city_in?: number;
  distance?: string;
}

export const getToursInACity = createAsyncThunk<
  any,
  IGetTours,
  {rejectValue: FetchError}
>('getToursInACity', async (data: IGetTours, thunkApi) => {
  try {
    const response = await http.get<any, any>(
      `/cities/` + data.city_in + '/activities',
      {
        params: {
          ...(data.lat &&
            data.long && {
              coordinates: `${data.lat},${data.long}`,
            }),
          text: data.query,
          feature_in: data.feature,
          country_in: data.country,
          category_in: data.category,
          distance: data.distance,
          sort_by: data.sort_by,
          limit: data.limit ?? 10,
          offset: data.offset ?? 0,
          city_in: data.city_in,
        },
      }
    );
    return {data: await response.data, sortedBy: data.sort_by};
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
