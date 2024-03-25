import {createAsyncThunk} from '@reduxjs/toolkit';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'utils/firebase';

interface FetchError {
  errorMessage: string | undefined;
}

export const AuthenticateUser = createAsyncThunk<
  any,
  {email: string; password: string},
  {rejectValue: FetchError}
>('user/auth', async (params, thunkApi) => {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      params.email,
      params.password
    );
    const data = await res.user;
    localStorage.setItem('token', data.uid);

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
