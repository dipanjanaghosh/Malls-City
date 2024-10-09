import { Injectable } from '@angular/core';
import { SearchCityService } from '../services/search-city.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addCityName,
  addCityNameSuccess,
  checkCityName,
  checkCityNameSuccess,
  getCityList,
  getCityListSuccess,
} from './app.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppEffects {
  constructor(
    private searchCityService: SearchCityService,
    private action$: Actions,
    private store: Store,
    private toster: ToastrService
  ) {}

  getCityList$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCityList),
      exhaustMap((action) => {
        return this.searchCityService.getAllCityList().pipe(
          map((data) => {
            console.log(data);
            return getCityListSuccess({ cities: data });
          })
        );
      })
    )
  );

  checkCityCode$ = createEffect(() =>
    this.action$.pipe(
      ofType(checkCityName),
      exhaustMap((action) => {
        return this.searchCityService.checkCity(action.cityCode).pipe(
          map((data) => {
            console.log(data);
            if (!data.value && data.msg.length > 0) {
              this.store.dispatch(addCityName({ cityObj: action.newCityName }));
            } else {
              this.toster.error('City exists', 'Please try unique CityCode!');
            }
            return checkCityNameSuccess({ checkCityResponse: data });
          }),
          catchError((error) =>{
            this.toster.error('checkCity Error', error);
            return of();
          })
        );
      })
    )
  );

  addCityName$ = createEffect(() =>
    this.action$.pipe(
      ofType(addCityName),
      exhaustMap((action) => {
        return this.searchCityService.addCity(action.cityObj).pipe(
          map((data) => {
            console.log('add city new respose:', data);
            this.toster.success('City added successfully', 'Success!');
            this.store.dispatch(getCityList());
            return addCityNameSuccess();
          })
        );
      })
    )
  );
}
