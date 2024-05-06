import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paramData } from '../../models/searchTerm.model';
import { GetMallListService } from '../../service/getmall-list.service';
import { mallsItem } from '../../models/malls.model';

@Component({
  selector: 'mall-list',
  templateUrl: './mall-list.component.html',
  styleUrls:[],
})
export class MallListComponent {
  selectedCity = '';
  mallList: mallsItem[] = [];
  mallsDetails!: mallsItem ;
  mallNames :string[] = [];
  mallCity = '';
  mallDescription = '';
  noOfFloors: any;
  mallAddress = '';
  constructor(
    private acRoute: ActivatedRoute,
    private getMallListService: GetMallListService
  ) {}

  ngOnInit() {
    this.getMallList();
    // this.acRoute.queryParams.subscribe((data:paramData)=>{
    //   console.log(data);
    //   this.selectedCity = data['city'] ;
    // })

    // this.selectedCity = this.acRoute.snapshot.queryParams["city"];
    // console.log("selecetd :",this.selectedCity);

    this.acRoute.queryParams.subscribe((data) => {
      this.selectedCity = data['city'];
      console.log(this.selectedCity);
    });
  }

  getMallList() {
    this.mallList = this.getMallListService.getMallListForSelectedCity();
    console.log('The mall list :', this.mallList);

    for (let mall of this.mallList) {
      this.mallNames.push(mall.name);
    }
    console.log("mallNames",this.mallNames);

    for (let i = 0; i < this.mallList.length; i++) {
      this.mallsDetails = this.mallList[i];
      this.mallNames.push(this.mallsDetails.name);
    }
    console.log("mallsDetails :",this.mallsDetails);
  }
}
