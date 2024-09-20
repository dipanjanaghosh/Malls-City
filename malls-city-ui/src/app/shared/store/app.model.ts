export interface AppStateModel {
  cities: CityList[];
  malls: MallList[];
  shops: ShopList[];
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
