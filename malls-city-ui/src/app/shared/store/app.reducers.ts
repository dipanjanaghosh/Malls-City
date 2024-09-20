import { createReducer, on } from '@ngrx/store';
import { getCityListSuccess } from './app.action';
import { GlobalState } from './app.state';
import { AppStateModel } from './app.model';

export const initialSate: AppStateModel = {
  cities: [],
  malls: [],
  shops: [],
};

export const appReducer = createReducer(
  initialSate,
  on(getCityListSuccess, (state, action) => {
    console.log('action :', action, state);
    let temp = {
      ...state,
      cities: action.cities,
    };
    console.log('temp :', temp.cities);
    return {
      ...state,
      cities: action.cities,
    };
  })
);

export function AppReducer(state: any, action: any) {
  return appReducer(state, action);
}
