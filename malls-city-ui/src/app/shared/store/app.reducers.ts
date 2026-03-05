import { createReducer, on } from '@ngrx/store';
import {
  addCityNameSuccess,
  checkCityNameSuccess,
  getCityListSuccess,
  updateCitySuccess,
} from './app.action';
import { initialState } from './app.state';
import { AppStateModel } from './app.model';

export const appReducer = createReducer(
  initialState,
  on(getCityListSuccess, (state, action): AppStateModel => {
    return {
      ...state,
      cities: action.cities,
    };
  }),
  on(checkCityNameSuccess, (state, action) => {
    return {
      ...state,
      checkCityResponse: action.checkCityResponse,
    };
  }),
  on(addCityNameSuccess, (state, action) => {
    return {
      ...state,
      checkCityResponse: {
        cityCode: 0,
        msg: '',
        name: '',
        state: '',
        value: false,
      },
    };
  }),
  on(updateCitySuccess, (state, action) => {
    return {
      ...state,
      cities: state.cities.map((city) =>
        city.id === action.city.id ? action.city : city,
      ),
    };
  }),
);

export function AppReducer(state: any, action: any) {
  return appReducer(state, action);
}
