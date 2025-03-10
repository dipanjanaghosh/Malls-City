import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIS, API_BASEURL } from '../../constant/app.constant';
import { Observable } from 'rxjs';
import { checkCityResponse } from 'src/app/admin/models/checkCity.model';

@Injectable({
  providedIn: 'root',
})
export class SearchCityService {
  constructor(private http: HttpClient) {}

  getAllCityList() {
    return this.http.get(API_BASEURL + APIS.CITY);
  }

  checkCity(cityCode: number): Observable<checkCityResponse> {
    return this.http.get<checkCityResponse>(
      `${API_BASEURL}${APIS.CITY}/${cityCode}`
    );
  }

  addCity(cityData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${API_BASEURL}${APIS.CITY}`, cityData, { headers });
  }
}
