import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CoreRoutingModule } from './core-routing.module';
import { MallListComponent } from './components/mall-list/mall-list.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { CardComponent } from '../shared/components/card/card.component';
import { MaterialModule } from '../Material.Module';

@NgModule({
  declarations: [MallListComponent, ShopListComponent],
  imports: [CommonModule, CoreRoutingModule, MaterialModule, CardComponent],
})
export class CoreModule {}
