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
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    StoresComponent,
    MallsComponent,
    AddCityComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    AdminRoutingModule
  ],
  exports: [AddCityComponent]
})
export class AdminModule { }
