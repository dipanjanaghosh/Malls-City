import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../Material.Module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HighlightsColorDirective } from './directives/highlight/highlights-color.directive';
import { RepeatitemsDirective } from './directives/repeat/repeatitems.directive';
import { LoggerService } from './services/logger.service';
import { SearchCityService } from './services/search-city.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HighlightsColorDirective,
    RepeatitemsDirective,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [HeaderComponent],
  providers: [LoggerService, SearchCityService, AuthService],
})
export class SharedModule {}
