import { createAction, props } from '@ngrx/store';
import { CityList, newCityNameModel } from './app.model';
import { checkCityResponse } from 'src/app/admin/models/checkCity.model';

export const GET_CITY_LIST = '[Home Component] Get City List';
export const GET_CITY_LIST_SUCCESS = '[Home Component] Get City List Success';
export const CHECK_CITY_NAME = '[Add City Component] Check City Name';
export const CHECK_CITY_NAME_SUCCESS =
  '[Add City Component] Check City Name Success';
export const ADD_CITY = '[Add City Component] Add City Name';
export const ADD_CITY_SUCCESS = '[Add City Component] Add City Name Success';

export const getCityList = createAction(GET_CITY_LIST);
export const getCityListSuccess = createAction(
  GET_CITY_LIST_SUCCESS,
  props<{ cities: CityList[] }>()
);

export const checkCityName = createAction(
  CHECK_CITY_NAME,
  props<{ cityCode: number; newCityName: newCityNameModel }>()
);

export const checkCityNameSuccess = createAction(
  CHECK_CITY_NAME_SUCCESS,
  props<{ checkCityResponse: checkCityResponse }>()
);

export const addCityName = createAction(
  ADD_CITY,
  props<{ cityObj: newCityNameModel }>()
);

export const addCityNameSuccess = createAction(ADD_CITY_SUCCESS);
