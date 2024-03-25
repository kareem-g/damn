import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from 'utils/firebase';

interface FetchError {
  errorMessage: string | undefined;
}

export const ResetPassword = createAsyncThunk<
  any,
  {email: string},
  {rejectValue: FetchError}
>('user/auth', async (params, thunkApi) => {
  try {
    const res = await sendPasswordResetEmail(auth, params.email);

    return res;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message as FetchError);
  }
});
