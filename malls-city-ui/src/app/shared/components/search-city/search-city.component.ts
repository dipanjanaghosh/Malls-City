import { Component, OnInit } from '@angular/core';
import { SearchCityService } from '../../services/search-city.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent implements OnInit {
  cityList: any;
  constructor(private searchCityService: SearchCityService) {}

  ngOnInit() {
    this.fetchCityList();
  }

  fetchCityList() {
    const apiUrl = 'http://localhost:5000/api/cities';
    this.searchCityService.getAllCityList(apiUrl).subscribe((data: any) => {
      this.cityList = data;

      console.log(this.cityList);
    });
  }
}
