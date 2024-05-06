import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MallListComponent } from './components/mall-list/mall-list.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';


@NgModule({
  declarations: [MallListComponent,ShopListComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
