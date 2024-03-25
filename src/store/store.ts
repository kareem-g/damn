import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import {rootReducer, RootState} from './root-reducer';
import {getTours} from 'middlewares/getTours.middleware';
import {getCategories} from 'middlewares/getCategories.middleware';
import {updateLocation} from 'slices/appFunctionality.slice';
import {toast} from 'react-toastify';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

if (!localStorage.getItem('curr')) {
  localStorage.setItem('curr', 'USD');
}
if (localStorage.getItem('coords')) {
  const position = JSON.parse(localStorage.getItem('coords') as string);
  store.dispatch(updateLocation(position));
  store.dispatch(getTours({...position, sort_by: 'relevance'}));
  store.dispatch(getTours({...position, sort_by: 'rating'}));
} else {
  navigator.geolocation.getCurrentPosition(
    ({coords}) => {
      const position = {
        lat: coords.latitude,
        long: coords.longitude,
        distance: '250KM',
      };
      localStorage.setItem('coords', JSON.stringify(position));
      store.dispatch(updateLocation({...position}));
      store.dispatch(getTours({...position, sort_by: 'relevance'}));
      store.dispatch(getTours({...position, sort_by: 'rating'}));
    },
    (error) => {
      console.error('Error getting user location:', error);
      toast.error(error.message + ' Displaying Random Tours');
      store.dispatch(getTours({sort_by: 'relevance'}));
      store.dispatch(getTours({sort_by: 'rating'}));
    }
  );
}
store.dispatch(getCategories());

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
