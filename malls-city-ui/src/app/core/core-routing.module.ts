import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MallListComponent } from './components/mall-list/mall-list.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';

const routes: Routes = [
  { path: 'mallslist', component: MallListComponent },
  { path: 'shopslist', component: ShopListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
