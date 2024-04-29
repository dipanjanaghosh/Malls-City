import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { SearchCityComponent } from './components/search-city/search-city.component';
import { AddCityComponent } from '../admin/components/add-city/add-city.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SearchCityComponent,AddCityComponent],
  imports: [CommonModule, SharedRoutingModule, MaterialModule, FormsModule,HttpClientModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
