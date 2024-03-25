import {
  authReducer,
  checkoutReducer,
  functionalityReducer,
  tourReducer,
} from '../slices';
import {combineReducers} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const reducers = combineReducers({
  tours: tourReducer,
  functionality: functionalityReducer,
  checkout: checkoutReducer,
  auth: authReducer,
});
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: storage,
  whitelist: ['checkout', 'auth', 'tours'],
};

export type RootState = ReturnType<typeof reducers>;
export const rootReducer = persistReducer(persistConfig, reducers);
