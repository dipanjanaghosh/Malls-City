import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIS, API_BASEURL } from '../constant/api.constant';
import { Observable } from 'rxjs';
import { checkCityResponse } from 'src/app/admin/models/checkCity.model';
import { CityList } from '../store/app.model';

@Injectable({
  providedIn: 'root',
})
export class SearchCityService {
  constructor(private http: HttpClient) {}

  getAllCityList(): Observable<CityList[]> {
    return this.http.get<CityList[]>(API_BASEURL + APIS.CITIES);
  }

  checkCity(cityCode: number): Observable<checkCityResponse> {
    return this.http.get<checkCityResponse>(
      `${API_BASEURL}${APIS.CHECK_CITY}/${cityCode}`
    );
  }

  addCity(cityData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${API_BASEURL}${APIS.ADD_CITY}`, cityData, {
      headers,
    });
  }
}
