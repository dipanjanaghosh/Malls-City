import { AppStateModel } from './app.model';

export const GlobalState: AppStateModel = {
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
