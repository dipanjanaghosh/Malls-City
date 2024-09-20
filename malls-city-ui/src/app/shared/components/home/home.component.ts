import { Component, OnInit } from '@angular/core';
import { SearchCityService } from '../../services/search-city.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCityList } from '../../store/app.action';
import { getCities } from '../../store/app.selector';

@Component({
  selector: 'app-search-city',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cityList: any;
  selectedCity: any;

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
    console.log('action dispatched');
    this.store.dispatch(getCityList());
    console.log('selector called');
    this.store.select(getCities).subscribe((data) => {
      console.log('City list from api', data);
      this.cityList = data;
    });
  }

  onCitySelected(cityName: string) {
    this.router.navigate(['/core/mallslist'], {
      queryParams: { city: cityName },
      skipLocationChange: true,
    });
  }
}
