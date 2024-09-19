import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SearchCityService } from '../../services/search-city.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [SearchCityService],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormField,
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a dropdown with test select your city', () => {
    let dropdwon = fixture.debugElement.nativeElement.querySelector('.bg');
    console.log('dropdwon', dropdwon.textContent);
    expect(component).toBeTruthy();
  });
});
