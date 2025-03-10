export interface checkCityResponse {
  cityCode: number;
  msg: string;
  name: string;
  state: string;
  value: boolean;
}

export interface CityList {
  cityCode: number;
  name: string;
  state: string;
}
