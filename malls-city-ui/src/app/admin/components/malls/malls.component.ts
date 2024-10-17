import { Component, OnInit } from '@angular/core';
import { SearchCityService } from 'src/app/shared/services/search-city.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STATES } from '../../constant/stateList.constant';

@Component({
  selector: 'app-malls',
  templateUrl: './malls.component.html',
  styleUrls: ['./malls.component.scss'],
})
export class MallsComponent implements OnInit {
  cityList: any;
  mallData: any;
  filteredCities: any[] = [];
  previewImage: string | null = null;
  myForm!: FormGroup;
  states = STATES;

  constructor(private searchCityService: SearchCityService) {}

  ngOnInit() {
    this.fetchCityList();
    this.fetchFormData();
  }

  fetchFormData() {
    this.myForm = new FormGroup({
      selectedState: new FormControl(''),
      selectedCity: new FormControl(''),
      mallName: new FormControl(''),
      floorNumber: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });

    this.myForm.get('selectedState')?.valueChanges.subscribe(selectedState => {
      this.filteredCities = this.cityList.filter((city: { state: any; }) => city.state === selectedState);
      this.myForm.get('selectedCity')?.setValue(''); // Reset the selected city
    });
  }

  fetchCityList() {
    this.searchCityService.getAllCityList().subscribe(
      (data: any) => {
      this.cityList = data;
      console.log(this.cityList);
      },
      (err: any) => {
        console.error('Error fetching city list:', err);
      }
    );
  }
  onSubmit(form: FormGroup) {
    console.log('Image:', this.previewImage);
    console.log('State:', form.value.selectedState);
    console.log('City:', form.value.selectedCity);
  }

  onImageUpload(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files; // Destructure to get the first file

      // Basic file type validation (consider adding more checks as needed)
      if (!file.type.startsWith('image/')) {
        alert('Unsupported file type. Please select an image file.');
        return;
      }

      reader.readAsDataURL(file);
      reader.onload = (loadEvent: any) => {
        this.previewImage = loadEvent.target.result;
      };
    }
  }
}
