import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paramData } from '../../models/searchTerm.model';
import { GetMallListService } from '../../service/getmall-list.service';
import { mallsItem } from '../../models/malls.model';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'mall-list',
  templateUrl: './mall-list.component.html',
  styleUrls: ['./mall-list.component.scss'],
})
export class MallListComponent {
  selectedCity = '';
  mallList: mallsItem[] = [];
  mallsDetails!: mallsItem;
  mallNames: string[] = [];
  mallCity = '';
  mallDescription = '';
  noOfFloors: any;
  mallAddress = '';
  filteredMallList: any[] = [];

  constructor(
    private acRoute: ActivatedRoute,
    private getMallListService: GetMallListService,
    private log: LoggerService
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
      this.log.info(
        `mall-list.component.ts::City List${JSON.stringify(this.selectedCity)}`
      );
      console.log();
    });
  }

  getMallList() {
    this.mallList = this.getMallListService.getMallListForSelectedCity();
    this.log.info(
      `mall-list.component.ts:mallList:${JSON.stringify(this.mallList)}`
    );

    for (let mall of this.mallList) {
      this.mallNames.push(mall.name);
    }
    this.log.info(
      `mall-list.component.ts:mallNames:${JSON.stringify(this.mallNames)}`
    );

    // for (let i = 0; i < this.mallList.length; i++) {
    //   this.mallsDetails = this.mallList[i];
    //   this.mallNames.push(this.mallsDetails.name);
    // }
    // console.log("mallsDetails :",this.mallsDetails);
  }
}
