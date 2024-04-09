import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './components/stores/stores.component';
import { MallsComponent } from './components/malls/malls.component';
import { AddCityComponent } from './components/add-city/add-city.component';



@NgModule({
  declarations: [
    StoresComponent,
    MallsComponent,
    AddCityComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
