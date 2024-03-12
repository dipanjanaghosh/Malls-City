import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCityComponent } from './components/search-city/search-city.component';

const routes: Routes = [
  {path:'', component:SearchCityComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
