import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/root-reducer';

import {Tabs} from 'models/tabs';

interface IFunctionalityState {
  currentTab: Tabs;
  sideBarOpened: boolean;
  coords: {
    lat: number;
    long: number;
    offset: number | string;
  };
}
const initialState: IFunctionalityState = {
  currentTab: Tabs.TOUR_HOME,
  sideBarOpened: false,
  coords: {
    lat: 0,
    long: 0,
    offset: '100KM',
  },
};
export const functionalitySlice = createSlice({
  name: 'functionality',
  initialState,
  reducers: {
    changeCurrentTab: (state, {payload}) => {
      state.currentTab = payload;
    },
    toggleSideBar: (state) => {
      state.sideBarOpened = !state.sideBarOpened;
    },
    updateLocation: (state, {payload}) => {
      state.coords = payload;
    },
  },
});
export const {changeCurrentTab, toggleSideBar, updateLocation} =
  functionalitySlice.actions;
export default functionalitySlice.reducer;
export const functionalityState = (state: RootState) => state.functionality;
