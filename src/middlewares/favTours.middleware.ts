import {createAsyncThunk} from '@reduxjs/toolkit';
import {addDoc, collection} from 'firebase/firestore';
import {db} from 'utils/firebase';
import {ITour} from 'models/tour';

interface FetchError {
  errorMessage: string | undefined;
}

export const addTourToFav = createAsyncThunk<
  ITour,
  {tour: ITour},
  {rejectValue: FetchError}
>('addTourToFav', async (data: {tour: ITour}, thunkApi) => {
  try {
    await addDoc(
      collection(
        db,
        'users',
        (thunkApi.getState() as any).auth.user?.uid,
        'favorites'
      ),
      data.tour
    );
    return data.tour;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
