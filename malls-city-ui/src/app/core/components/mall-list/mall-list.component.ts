import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetMallListService } from '../../service/getmall-list.service';
import { mallsItem } from '../../models/malls.model';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'mall-list',
  templateUrl: './mall-list.component.html',
  styleUrls: ['./mall-list.component.scss'],
})
export class MallListComponent {
  private acRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private getMallListService = inject(GetMallListService);
  private log = inject(LoggerService);

  selectedCity = '';
  mallList: mallsItem[] = [];
  mallsDetails!: mallsItem;
  mallNames: string[] = [];
  mallCity = '';
  mallDescription = '';
  noOfFloors: any;
  mallAddress = '';
  filteredMallList: any[] = [];

  ngOnInit() {
    this.getMallList();

    this.acRoute.queryParams.subscribe((data) => {
      this.selectedCity = data['city'];
      this.log.info(
        `mall-list.component.ts::City List${JSON.stringify(this.selectedCity)}`
      );
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
  }

  navigateToShops(mall: mallsItem) {
    this.log.info(`Navigating to shops for mall: ${mall.name} (${mall.id})`);
    this.router.navigate(['/core/shopslist'], {
      queryParams: {
        mallId: mall.id,
        mallName: mall.name
      }
    });
  }
}
