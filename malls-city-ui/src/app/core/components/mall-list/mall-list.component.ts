import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paramData } from './models/mall.model';
import { GetMallListService } from '../../service/getmall-list.service';

@Component({
  selector: 'mall-list',
  templateUrl: './mall-list.component.html',
  styleUrls:[],
})
export class MallListComponent {
  selectedCity = '';
  mallList: any;
  mallsDetails:any;
  mallNames = [];
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

    // for (let mall of this.mallList) {
    //   console.log(mall.name);
    //   this.mallNames.push(mall["name"]);
    // }

    // for (let i = 0; i < this.mallList.length; i++) {
    //   this.mallsDetails = this.mallList[i];
    //   this.mallNames.push(this.mallsDetails.name);
    //   console.log(this.mallNames);
    // }
  }
}
