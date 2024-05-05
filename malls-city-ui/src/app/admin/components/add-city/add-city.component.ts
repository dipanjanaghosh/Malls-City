import { Component,OnInit } from '@angular/core';
import { SearchCityService } from 'src/app/shared/services/search-city.service';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {
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
