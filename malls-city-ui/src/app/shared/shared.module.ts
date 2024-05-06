import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent],
  imports: [CommonModule, SharedRoutingModule, MaterialModule, FormsModule,HttpClientModule,AdminModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
