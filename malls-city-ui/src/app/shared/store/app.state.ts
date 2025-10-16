import { AppStateModel } from './app.model';

export const initialState: AppStateModel = {
  cities: [],
  malls: [],
  shops: [],
  checkCityResponse: {
    cityCode: 0,
    msg: '',
    state: '',
    name: '',
    value: false,
  },
};
