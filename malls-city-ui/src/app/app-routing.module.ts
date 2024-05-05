import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './admin/components/add-city/add-city.component';
import { MallListComponent } from './core/components/mall-list/mall-list.component';


const routes: Routes = [
  {path:'addcity',component:AddCityComponent},
  {path:'mallslist', component:MallListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
