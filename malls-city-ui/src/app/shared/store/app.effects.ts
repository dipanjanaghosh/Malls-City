import { Injectable } from '@angular/core';
import { SearchCityService } from '../services/search-city.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getCityList, getCityListSuccess } from './app.action';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(
    private searchCityService: SearchCityService,
    private action$: Actions
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
}
