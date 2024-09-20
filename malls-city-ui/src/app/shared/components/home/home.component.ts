import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchCityService } from '../../services/search-city.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCityList } from '../../store/app.action';
import { getCities } from '../../store/app.selector';
import { AppStateModel } from '../../store/app.model';
import { Subscription } from 'rxjs';

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
    private searchCityService: SearchCityService,
    private router: Router,
    private store: Store
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
