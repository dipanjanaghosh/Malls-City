import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './components/stores/stores.component';
import { MallsComponent } from './components/malls/malls.component';



@NgModule({
  declarations: [
    StoresComponent,
    MallsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
