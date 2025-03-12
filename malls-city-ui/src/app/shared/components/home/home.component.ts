import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCityList } from '../../store/app.action';
import { getCities } from '../../store/app.selector';
import { Subscription } from 'rxjs';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cityList: any;
  selectedCity: any;
  subs!: Subscription;

  constructor(
    private router: Router,
    private store: Store,
    private log: LoggerService
  ) {}

  ngOnInit() {
    this.fetchCityList();
  }

  fetchCityList() {
    // this.searchCityService.getAllCityList().subscribe((data: any) => {
    //   this.cityList = data;
    // });
    this.store.dispatch(getCityList());
    this.subs = this.store.select(getCities).subscribe((data) => {
      this.cityList = data;
      this.log.info(`home.component.ts::City List${this.cityList}`);
    });
  }

  onCitySelected(cityName: string) {
    this.router.navigate(['/core/mallslist'], {
      queryParams: { city: cityName },
      skipLocationChange: true,
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
