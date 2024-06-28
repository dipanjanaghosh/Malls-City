import { Component, Input } from '@angular/core';
import { SearchCityService } from 'src/app/shared/services/search-city.service';
import { checkCityResponse } from '../../models/checkCity.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent {
  @Input() cityListInput?: any[];

  constructor(private searchCityService: SearchCityService) {}

  ngOnInit() {}

  handleEditCity(city: checkCityResponse) {
    // TODO: Implement editing city functionality
    console.log(`Editing city: ${city.name}`, city);
  }
}
