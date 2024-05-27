import { Component, OnInit } from '@angular/core';
import { SearchCityService } from 'src/app/shared/services/search-city.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-malls',
  templateUrl: './malls.component.html',
  styleUrls: ['./malls.component.scss'],
})
export class MallsComponent  implements OnInit {
  cityList: any;
  mallData: any;
  previewImage: string | null = null;
  myForm!: FormGroup;
  constructor(private searchCityService: SearchCityService) {}

  ngOnInit() {
    this.fetchCityList();
    this.myForm = new FormGroup({
      selectedState: new FormControl(''),
      selectedCity: new FormControl(''),
      mallName: new FormControl(''),
      floorNumber: new FormControl(''),
      address: new FormControl(''),
      description: new FormControl('')
    });
  }
  fetchCityList() {
    this.searchCityService.getAllCityList().subscribe((data: any) => {
      this.cityList = data;
      console.log(this.cityList);
    });
  }
  onSubmit(form: FormGroup) {
    console.log('Image:',this.previewImage);
    console.log('State:',form.value.selectedState);
    console.log('City:',form.value.selectedCity);
    console.log('MallName:', form.value.mallName);
    console.log('Total Floor Number:', form.value.floorNumber);
    console.log('Address:', form.value.address);
    console.log('Description:', form.value.description);
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
