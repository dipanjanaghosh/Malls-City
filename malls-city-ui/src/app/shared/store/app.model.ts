export interface AppState {
  cities: CityList[];
}

export interface CityList {
  id: string;
  name: string;
  cityCode: number;
  state: string;
}
