import { createAction, props } from '@ngrx/store';
import { CityList } from './app.model';

export const GET_CITY_LIST = '[Home Component] Get City List';
export const GET_CITY_LIST_SUCCESS = '[Home Component] Get City List Success';

export const getCityList = createAction(GET_CITY_LIST);
export const getCityListSuccess = createAction(
  GET_CITY_LIST_SUCCESS,
  props<{ cities: CityList[] }>()
);
