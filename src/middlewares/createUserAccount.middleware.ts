import {createAsyncThunk} from '@reduxjs/toolkit';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from 'utils/firebase';

interface FetchError {
  errorMessage: string | undefined;
}

export const CreateNewUserAccount = createAsyncThunk<
  any,
  {email: string; password: string; name: string},
  {rejectValue: FetchError}
>('user/create', async (params, thunkApi) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password
    );
    const user = res.user;
    localStorage.setItem('token', user.uid);
    await setDoc(doc(db, 'users', user.uid), {
      firebaseUser: JSON.stringify(user),
      uid: user.uid,
      name: params.name,
      authProvider: 'local',
      email: user.email,
      role: 'user',
      registrationSource: 'web',
      createdAt: new Date().getTime(),
    });
    console.log(user);
    return {...user, displayName: params.name};
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as FetchError);
  }
});
