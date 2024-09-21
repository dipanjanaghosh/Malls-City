import { Component } from '@angular/core';
import { SearchCityService } from 'src/app/shared/services/search-city.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {
  cityList: any;
  constructor(private searchCityService: SearchCityService) {}

  ngOnInit() {
    this.fetchCityList();
  }
  fetchCityList() {
    this.searchCityService.getAllCityList().subscribe((data: any) => {
      this.cityList = data;

      console.log(this.cityList);
    });
  }

}
