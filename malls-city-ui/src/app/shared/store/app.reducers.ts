import { createReducer, on } from '@ngrx/store';
import {
  addCityNameSuccess,
  checkCityNameSuccess,
  getCityListSuccess,
} from './app.action';
import { GlobalState } from './app.state';

export const appReducer = createReducer(
  GlobalState,
  on(getCityListSuccess, (state, action) => {
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
  })
);

export function AppReducer(state: any, action: any) {
  return appReducer(state, action);
}
