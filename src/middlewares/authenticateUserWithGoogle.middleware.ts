import {createAsyncThunk} from '@reduxjs/toolkit';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from 'utils/firebase';

interface FetchError {
  errorMessage: string | undefined;
}

export const AuthenticateUserWithGoogle = createAsyncThunk<
  any,
  undefined,
  {rejectValue: FetchError}
>('user/createGoogleAccount', async (_, thunkApi) => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const data = await res.user;
    localStorage.setItem('token', data.uid);
    await setDoc(doc(db, 'users', data.uid), {
      firebaseUser: JSON.stringify(data),
      uid: data.uid,
      //   name: params.name,
      authProvider: 'google',
      email: data.email,
      role: 'user',
      registrationSource: 'web',
      createdAt: new Date().getTime(),
    });
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message as FetchError);
  }
});
