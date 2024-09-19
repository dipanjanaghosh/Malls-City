import { createReducer, on } from '@ngrx/store';
import { getCityListSuccess } from './app.action';
import { GlobalState } from './app.state';

export const appReducer = createReducer(
  GlobalState,
  on(getCityListSuccess, (state, action) => {
    return {
      ...state,
      cities: action.cities,
    };
  })
);
