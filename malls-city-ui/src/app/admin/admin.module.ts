import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './components/stores/stores.component';
import { MallsComponent } from './components/malls/malls.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { MaterialModule } from '../Material.Module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    StoresComponent,
    MallsComponent,
    AddCityComponent
  ],
  imports: [
    CommonModule, MaterialModule, FormsModule,HttpClientModule,MatSelectModule,MatFormFieldModule,MatInputModule
  ],
  exports: [AddCityComponent]
})
export class AdminModule { }
