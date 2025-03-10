import { Component, Input, ViewChild } from '@angular/core';
import { SearchCityService } from 'src/app/shared/services/search-city.service';
import { CityList, checkCityResponse } from '../../models/checkCity.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent {
  @Input() cityListInput!: CityList[];
  displayedColumns: string[] = ['name', 'edit'];
  cityList = new MatTableDataSource(this.cityListInput);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    console.log('citylist', this.cityListInput);
    this.cityList = new MatTableDataSource(this.cityListInput);
  }
  ngAfterViewInit() {
    this.cityList.paginator = this.paginator;
  }

  handleEditCity(city: checkCityResponse) {
    // TODO: Implement editing city functionality
    console.log(`Editing city: ${city.name}`, city);
  }
}
