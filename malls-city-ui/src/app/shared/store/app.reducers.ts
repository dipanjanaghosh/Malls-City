import { createReducer, on } from '@ngrx/store';
import { getCityListSuccess } from './app.action';
import { GlobalState } from './app.state';

export const appReducer = createReducer(
  GlobalState,
  on(getCityListSuccess, (state, action) => {
    console.log('action :', action, state);
    let temp = {
      ...state,
      cities: action.cities,
    };
    console.log('temp :', temp);
    return temp;
  })
);
