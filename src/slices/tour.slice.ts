import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getTours} from '../middlewares/getTours.middleware';
import {RootState} from '../store/root-reducer';
import {getCategories} from 'middlewares/getCategories.middleware';
import {ITour, ITourMedia} from 'models/tour';
import {ICategory} from 'models/category';
import {getSpecificTour} from 'middlewares/getSpecificTour.middleware';
import {getTourAvailableDates} from 'middlewares/getTourAvailableDates.middleware';
import {getTourGroupSlots} from 'middlewares/getTourGroupSlots.middleware';
import {IGroup, IGroupSlots} from 'models/tourGroups';
import {Dayjs} from 'dayjs';
import {IPickupPoint} from 'models/pickup';
import {getTourPickupPoints} from 'middlewares/getTourPickupPoints.middleware';
import {getTourMedia} from 'middlewares/getTourMedia.middleware';
import {getActivityLanguages} from 'middlewares/getActivityLanguages.middleware';
import {getToursInACity} from 'middlewares/getToursInACity.middleware';
import {addTourToFav} from 'middlewares/favTours.middleware';
import {getAllUserOrders} from 'middlewares/orders.middleware';
import {IOrder} from 'models/order';

interface ITourState {
  tours: ITour[];
  categories: ICategory[];
  message: string;
  status: boolean;
  selectedTourLanguages: {code: string; name: string}[];
  recommendedTours: ITour[];
  attractionTours: ITour[];
  favorites: ITour[];
  loading: boolean;
  currency: string;
  error: boolean;
  selectedTour: ITour | null;
  selectedTourAvailableDates: string[];
  groupSlots: IGroupSlots;
  selectedGroupSlots: IGroup[] | null;
  selectedTourDate: Dayjs | null | any;
  selectedTourPickupPoints: IPickupPoint[];
  selectedPickupUuid: string;
  specificTourMedia: ITourMedia[];
  favTours: ITour[];
  orders: IOrder[];
}
const initialState: ITourState = {
  tours: [],
  categories: [],
  message: '',
  favorites: [],
  recommendedTours: [],
  attractionTours: [],
  selectedTourLanguages: [],
  status: false,
  loading: false,
  currency: '',
  error: false,
  selectedTour: null,
  selectedTourAvailableDates: [],
  groupSlots: {groups: []},
  selectedGroupSlots: null,
  selectedTourDate: null,
  selectedTourPickupPoints: [],
  selectedPickupUuid: '',
  specificTourMedia: [],
  favTours: [],
  orders: [],
};
export const tourSlice = createSlice({
  name: 'getTours',
  initialState,
  reducers: {
    addToFavorites: (state, {payload}) => {
      state.favorites.push(payload);
    },
    emptyToursArray: (state) => {
      state.tours.length = 0;
    },
    removeFromFavorties: (state, {payload}) => {
      state.favorites = state.favorites.filter((item) => item.uuid !== payload);
    },
    selectTour: (state, {payload}) => {
      state.selectedTour = payload;
    },
    selectTourGroupSlots: (state, {payload}) => {
      state.selectedGroupSlots = payload;
      state.groupSlots = payload;
    },
    selectTourDate: (state, {payload}) => {
      state.selectedTourDate = payload;
    },
    selectPickupUuid: (state, {payload}: PayloadAction<string>) => {
      state.selectedPickupUuid = payload;
    },
    setTourAvailableDates: (state, {payload}: PayloadAction<string[]>) => {
      state.selectedTourAvailableDates = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTourToFav.fulfilled, (state, {payload}) => {
      const target = state.favTours.find((item) => item.uuid === payload.uuid);
      if (target) {
        state.favTours = state.favTours.filter(
          (item) => item.uuid !== payload.uuid
        );
      } else {
        state.favTours.push(payload);
      }
    });
    builder.addCase(
      getTours.fulfilled,
      (state, {payload}: PayloadAction<{data: ITour[]; sortedBy: string}>) => {
        state.error = false;
        if (payload.data.length === 0) state.error = true;

        if (payload.sortedBy) {
          if (payload.sortedBy === 'relevance') {
            state.recommendedTours = payload.data;
          } else {
            state.attractionTours = payload.data;
          }
        } else {
          state.tours = payload.data;
        }
        state.loading = false;
        state.status = true;
      }
    );

    builder.addCase(getAllUserOrders.pending, (state) => {
      state.loading = true;
      state.status = false;
      state.error = false;
    });
    builder.addCase(
      getAllUserOrders.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload.error?.message;
        state.loading = false;
        state.status = false;
        state.error = true;
      }
    );
    builder.addCase(
      getAllUserOrders.fulfilled,
      (state, {payload}: PayloadAction<IOrder[]>) => {
        state.orders = payload;
        state.loading = false;
        state.status = true;
        state.error = false;
      }
    );
    builder.addCase(getTours.pending, (state) => {
      state.loading = true;
      state.status = false;
      state.error = false;
    });
    builder.addCase(
      getTours.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload.error?.message;
        state.loading = false;
        state.status = false;
        state.error = true;
      }
    );
    builder.addCase(
      getToursInACity.fulfilled,
      (state, {payload}: PayloadAction<{data: ITour[]; sortedBy: string}>) => {
        console.log(payload);
        state.tours = payload.data;
        state.loading = false;
        state.status = true;
        state.error = false;
      }
    );
    builder.addCase(getToursInACity.pending, (state) => {
      state.loading = true;
      state.status = false;
      state.error = false;
    });
    builder.addCase(
      getToursInACity.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload.error?.message;
        state.loading = false;
        state.status = false;
        state.error = true;
      }
    );
    builder.addCase(
      getSpecificTour.fulfilled,
      (state, {payload}: PayloadAction<ITour>) => {
        state.selectedTour = payload;
        state.loading = false;
        state.status = true;
      }
    );
    builder.addCase(getSpecificTour.pending, (state) => {
      state.loading = true;
      state.status = false;
      state.error = false;
    });
    builder.addCase(
      getSpecificTour.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload.error?.message;
        state.loading = false;
        state.status = false;
      }
    );
    builder.addCase(
      getCategories.fulfilled,
      (state, {payload}: PayloadAction<ICategory[]>) => {
        state.categories = payload;
        state.loading = false;
        state.status = true;
      }
    );
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.status = false;
      state.error = false;
    });
    builder.addCase(
      getCategories.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload?.error?.message;
        state.loading = false;
        state.status = false;
      }
    );
    builder.addCase(
      getTourAvailableDates.fulfilled,
      (state, {payload}: PayloadAction<string[]>) => {
        state.selectedTourAvailableDates = payload;
        state.loading = false;
        state.status = true;
      }
    );
    builder.addCase(getTourAvailableDates.pending, (state) => {
      state.loading = true;
      state.status = false;
      state.error = false;
    });
    builder.addCase(
      getTourAvailableDates.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.selectedTourAvailableDates = [];
        state.message = payload?.error?.message;
        state.loading = false;
        state.status = false;
      }
    );
    builder.addCase(
      getTourGroupSlots.fulfilled,
      (state, {payload}: PayloadAction<IGroupSlots>) => {
        state.groupSlots = payload;
        state.loading = false;
        state.status = true;
      }
    );
    builder.addCase(getTourGroupSlots.pending, (state) => {
      state.loading = true;
      state.status = true;
    });
    builder.addCase(
      getTourGroupSlots.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload?.error?.message;
        state.loading = false;
        state.status = false;
      }
    );
    builder.addCase(
      getTourPickupPoints.fulfilled,
      (state, {payload}: PayloadAction<IPickupPoint[]>) => {
        state.selectedTourPickupPoints = payload;
        state.loading = false;
        state.status = true;
      }
    );
    builder.addCase(getTourPickupPoints.pending, (state) => {
      state.loading = true;
      state.status = true;
    });
    builder.addCase(
      getTourPickupPoints.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload?.error?.message;
        state.loading = false;
        state.status = false;
      }
    );
    builder.addCase(
      getActivityLanguages.fulfilled,
      (state, {payload}: PayloadAction<{code: string; name: string}[]>) => {
        state.selectedTourLanguages = payload;
        state.loading = false;
        state.status = true;
      }
    );
    builder.addCase(getActivityLanguages.pending, (state) => {
      state.loading = true;
      state.status = true;
    });
    builder.addCase(
      getActivityLanguages.rejected,
      (state, {payload}: PayloadAction<any>) => {
        state.message = payload?.error?.message;
        state.loading = false;
        state.status = false;
      }
    );
    builder.addCase(getTourMedia.pending, (state) => {
      state.loading = true;
      state.status = true;
      state.specificTourMedia = [];
    });
    builder.addCase(getTourMedia.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.specificTourMedia = payload;
    });
  },
});
export const {
  selectTour,
  emptyToursArray,
  selectTourGroupSlots,
  selectTourDate,
  selectPickupUuid,
  setTourAvailableDates,
} = tourSlice.actions;
export default tourSlice.reducer;
export const toursState = (state: RootState) => state.tours;
