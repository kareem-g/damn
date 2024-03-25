import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/root-reducer';
import {AuthenticateUserWithGoogle} from 'middlewares/authenticateUserWithGoogle.middleware';
import {CreateNewUserAccount} from 'middlewares/createUserAccount.middleware';
import {IUser} from 'models/user';
import {AuthenticateUser} from 'middlewares/signInAUser.middleware';

interface IFunctionalityState {
  user: IUser | null;
  isLoading: boolean;
  errorMessage: string;
}
const initialState: IFunctionalityState = {
  user: null,
  isLoading: false,
  errorMessage: '',
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.clear();
    },
    SignUserIn: (state, {payload}: PayloadAction<{token: string}>) => {
      state.user = {
        uid: payload.token,
        email: 'anonymous@gmail.com',
        name: 'anonymous',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AuthenticateUserWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      AuthenticateUserWithGoogle.fulfilled,
      (state, {payload}) => {
        state.user = payload;
        state.isLoading = false;
      }
    );
    builder.addCase(AuthenticateUserWithGoogle.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.errorMessage = payload?.errorMessage as string;
    });
    builder.addCase(CreateNewUserAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateNewUserAccount.fulfilled, (state, {payload}) => {
      state.user = {
        uid: payload.uid,
        email: payload.email,
        name: payload.displayName,
      };
      state.isLoading = false;
    });
    builder.addCase(CreateNewUserAccount.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.errorMessage = payload?.errorMessage as string;
    });
    builder.addCase(AuthenticateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AuthenticateUser.fulfilled, (state, {payload}) => {
      state.user = payload;
      state.isLoading = false;
    });
    builder.addCase(AuthenticateUser.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.errorMessage = payload?.errorMessage as string;
    });
  },
});
export const {logOut, SignUserIn} = authSlice.actions;
export default authSlice.reducer;
export const authState = (state: RootState) => state.auth;
