import { Component, OnInit, Input } from '@angular/core';
import { STATES } from '../../constant/stateList.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchCityService } from 'src/app/shared/services/search-city.service';
import { Store } from '@ngrx/store';
import { getCities } from 'src/app/shared/store/app.selector';
import { checkCityName } from 'src/app/shared/store/app.action';
import { newCityNameModel } from 'src/app/shared/store/app.model';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  states = STATES;
  myForm!: FormGroup;
  cityList: any;
  cityData!: newCityNameModel;

  constructor(private store: Store) {}

  ngOnInit() {
    this.fetchFormData();
    this.fetchCityListIntoAccordian();
  }

  fetchCityListIntoAccordian() {
    this.store.select(getCities).subscribe((data) => {
      this.cityList = data;
    });
  }

  fetchFormData() {
    this.myForm = new FormGroup({
      selectedState: new FormControl('', Validators.required),
      cityName: new FormControl('', Validators.required),
      cityCode: new FormControl('', Validators.required),
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
      this.store.dispatch(
        checkCityName({
          cityCode: this.cityData.cityCode,
          newCityName: this.cityData,
        })
      );
    }
  }
}
