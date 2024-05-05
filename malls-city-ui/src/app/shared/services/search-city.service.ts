import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIS, API_BASEURL } from '../constant/api.constant';

@Injectable({
  providedIn: 'root',
})
export class SearchCityService {
  baseUrl = API_BASEURL;
  constructor(private http: HttpClient) {}

  getAllCityList() {
    return this.http.get(this.baseUrl + APIS.CITIES);
  }
}
