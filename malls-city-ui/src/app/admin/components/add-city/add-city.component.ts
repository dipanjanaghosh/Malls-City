import { Component, OnInit, Input } from '@angular/core';
import { STATES } from '../../constant/stateList.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchCityService } from 'src/app/shared/services/search-city.service';
import { checkCityResponse } from '../../models/checkCity.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  states = STATES;
  myForm!: FormGroup;
  cityList: any;

  constructor(
    private searchCityService: SearchCityService,
    private toster: ToastrService
  ) {}

  ngOnInit() {
    this.fetchFormData();
    this.fetchCityListIntoAccordian();
  }

  fetchCityListIntoAccordian() {
    this.searchCityService.getAllCityList().subscribe((data) => {
      this.cityList = data;
      console.log('fetchCityListIntoAccordian');
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
      const cityData = {
        state: formData.selectedState,
        name: formData.cityName,
        cityCode: formData.cityCode,
      };
      console.log(formData);
      console.log(cityData);

      this.searchCityService
        .checkCity(formData.cityCode)
        .subscribe((res: checkCityResponse) => {
          if (!res.value) {
            this.searchCityService
              .addCity(cityData)
              .subscribe(async (res: any) => {
                await this.fetchCityListIntoAccordian();
                console.log(res.msg);
                this.toster.success(res.msg);
              });
          } else {
            this.toster.error(res.msg, 'Oops, something went wrong!');
          }
        });
    } else {
      console.log('Form is not valid');
    }
  }
}
