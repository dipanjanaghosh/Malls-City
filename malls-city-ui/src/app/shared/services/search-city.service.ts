import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIS, API_BASEURL } from '../constant/api.constant';
import { Observable, catchError, map } from 'rxjs';
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
    return this.http.get<checkCityResponse>(`${API_BASEURL}${APIS.CHECK_CITY}/${cityCode}`)
    .pipe(
      map((res) =>{
        return res;
      }),
      catchError((err) => {
        console.log("Error url :",err.url)
        console.log("Error text :", err.error.text)
        throw new Error(err.error.text);
      })
    );
  }

  addCity(cityData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${API_BASEURL}${APIS.ADD_CITY}`, cityData, {
      headers,
    });
  }
}
