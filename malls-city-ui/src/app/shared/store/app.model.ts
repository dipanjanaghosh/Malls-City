import { checkCityResponse } from 'src/app/admin/models/checkCity.model';

export interface AppStateModel {
  cities: CityList[];
  malls: MallList[];
  shops: ShopList[];
  checkCityResponse: checkCityResponse;
}

export interface CityList {
  id: string;
  name: string;
  cityCode: number;
  state: string;
}

export interface MallList {
  id: string;
  name: string;
  cityCode: number;
  state: string;
}

export interface ShopList {
  id: string;
  name: string;
  cityCode: number;
  state: string;
}

export interface newCityNameModel {
  state: string;
  cityCode: number;
  name: string;
}
