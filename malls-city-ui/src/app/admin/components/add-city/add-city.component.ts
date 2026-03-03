import { Component, OnInit, inject } from '@angular/core';
import { STATES } from '../../constant/stateList.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getCities } from 'src/app/shared/store/app.selector';
import { checkCityName, getCityList } from 'src/app/shared/store/app.action';
import { CityList, newCityNameModel } from 'src/app/shared/store/app.model';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  private store = inject(Store);
  private log = inject(LoggerService);

  states = STATES;
  myForm!: FormGroup;
  cityList: any;
  cityData!: newCityNameModel;
  isEditMode = false;

  ngOnInit() {
    this.fetchFormData();
    this.fetchCityListIntoAccordian();
  }

  fetchCityListIntoAccordian() {
    this.store.dispatch(getCityList());
    this.store.select(getCities).subscribe((data) => {
      this.cityList = data;
      this.log.info(
        `add-city.component.ts: Cities fetched: ${data?.length || 0}`,
      );
    });
  }

  fetchFormData() {
    this.myForm = new FormGroup({
      selectedState: new FormControl('', Validators.required),
      cityName: new FormControl('', Validators.required),
      cityCode: new FormControl('', Validators.required),
    });
  }

  onEditCity(city: CityList) {
    this.isEditMode = true;
    this.log.info(`addCity.component.ts: Patching form for city: ${city.name}`);
    this.myForm.patchValue({
      selectedState: city.state,
      cityName: city.name,
      cityCode: city.cityCode,
    });
  }

  resetForm() {
    this.isEditMode = false;
    this.myForm.reset({
      selectedState: '',
      cityName: '',
      cityCode: '',
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.cityData = {
        state: formData.selectedState,
        name: formData.cityName,
        cityCode: formData.cityCode,
      };
      this.log.info(
        `addCity.component.ts:onSubmit:${JSON.stringify(this.cityData)}`,
      );
      this.store.dispatch(
        checkCityName({
          cityCode: this.cityData.cityCode,
          newCityName: this.cityData,
        }),
      );
    } else {
      this.log.error(`addCity.component.ts:onSubmit:Form is invalid::}`);
    }
  }
}
