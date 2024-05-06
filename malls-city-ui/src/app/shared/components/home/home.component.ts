import { Component, OnInit } from '@angular/core';
import { SearchCityService } from '../../services/search-city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-city',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cityList: any;
  selectedCity: any;

  constructor(private searchCityService: SearchCityService, private router: Router) {}

  ngOnInit() {
    this.fetchCityList();
  }

  fetchCityList() {
    this.searchCityService.getAllCityList().subscribe((data: any) => {
      this.cityList = data;
    });
  }

  onCitySelected(cityName:string) {
    this.router.navigate(['/core/mallslist'],
    { queryParams: { city: cityName } });
  }
}
