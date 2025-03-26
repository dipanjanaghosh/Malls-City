import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoggerService } from '../../services/logger.service';
import { getCityList } from '../../store/app.action';
import { getCities } from '../../store/app.selector';
import { of } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routerSpy: jasmine.SpyObj<Router>;
  let loggerSpy: jasmine.SpyObj<LoggerService>;
  let loader: HarnessLoader;

  const mockCities = [{ name: 'New York' }, { name: 'London' }];

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    loggerSpy = jasmine.createSpyObj('LoggerService', ['info']);
    // Mock store.select to return observable of mockCities
    storeSpy.select.and.returnValue(of(mockCities));

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LoggerService, useValue: loggerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.cityList = mockCities; // Set cityList before change detection
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  afterEach(() => {
    if (component.subs) {
      component.subs.unsubscribe(); // Ensure cleanup
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call fetchCityList on initialization', () => {
      spyOn(component, 'fetchCityList');
      component.ngOnInit();
      expect(component.fetchCityList).toHaveBeenCalled();
    });
  });

  describe('fetchCityList', () => {
    it('should dispatch getCityList action', () => {
      component.fetchCityList();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(getCityList());
    });

    it('should subscribe to getCities and update cityList', () => {
      component.fetchCityList();
      expect(storeSpy.select).toHaveBeenCalled();
      expect(component.cityList).toEqual(mockCities);
    });

    it('should log the city list length', () => {
      component.fetchCityList();
      expect(loggerSpy.info).toHaveBeenCalledWith(
        `home.component.ts::City List${mockCities.length}`
      );
    });
  });

  describe('onCitySelected', () => {
    it('should navigate to mallslist with selected city as query param', () => {
      const cityName = 'New York';
      component.onCitySelected(cityName);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/core/mallslist'], {
        queryParams: { city: cityName },
        skipLocationChange: true,
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from the subscription', () => {
      component.fetchCityList(); // Create subscription
      spyOn(component.subs, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subs.unsubscribe).toHaveBeenCalled();
    });

    it('should not throw error if no subscription exists', () => {
      component.subs = undefined as any; // No subscription
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('template', () => {
    it('should render city options in mat-select', async () => {
      component.cityList = mockCities;
      fixture.detectChanges();

      // Use harness to interact with mat-select
      const select = await loader.getHarness(MatSelectHarness);
      await select.open(); // Open the dropdown
      const options = await select.getOptions();
      expect(options.length).toBe(mockCities.length);
      const optionText = await options[0].getText(); // Await the Promise here
      expect(optionText).toBe('New York');
      // expect(options[1].textContent).toContain('London');
    });

    it('should call onCitySelected when a city is clicked', async () => {
      // Set cityList and trigger change detection
      component.cityList = mockCities;
      fixture.detectChanges();

      // Spy on onCitySelected *before* any interaction
      spyOn(component, 'onCitySelected');

      // Use harness to interact with mat-select
      const select = await loader.getHarness(MatSelectHarness);
      await select.open(); // Open the dropdown
      const options = await select.getOptions();
      expect(options.length).toBe(mockCities.length);

      const optionToClick = options[0];
      const cityName = await optionToClick.getText();
      await optionToClick.click(); // Click the first option

      // Trigger change detection *after* the click
      fixture.detectChanges();

      // expect(component.onCitySelected).toHaveBeenCalledWith(cityName);
      // we check if the router.navigate is called with the correct city name.
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/core/mallslist'], {
        queryParams: { city: cityName },
        skipLocationChange: true,
      });
    });
  });
});
