import { Component,Input  } from '@angular/core';
import { SearchCityService } from 'src/app/shared/services/search-city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})

export class CityListComponent {
  cityList: any;
  openedItemIndex = -1;

  constructor(private searchCityService:SearchCityService ){}

  ngOnInit() {
    this.searchCityService.getAllCityList()
      .subscribe(data => {
        this.cityList = data;
      });
  }

  toggleItem(index: number) {
    this.openedItemIndex = this.openedItemIndex === index ? -1 : index;
  }
}
