import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../service/shop.service';
import { ShopItem } from '../../models/shop.model';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private shopService = inject(ShopService);
  private log = inject(LoggerService);

  mallId: string = '';
  mallName: string = '';
  shopList: ShopItem[] = [];
  filteredShopList: ShopItem[] = [];

  floors: string[] = ['ALL', 'ground', '1st floor', '2nd floor', '3rd floor'];
  selectedFloor: string = 'ALL';

  categories: string[] = [
    'ALL',
    'Clothes',
    'Resturent',
    'Kids Zone',
    'Saloon',
    'Electronics',
  ];
  selectedCategory: string = 'ALL';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.mallId = params['mallId'] || '';
      this.mallName = params['mallName'] || 'Selected Mall';
      this.log.info(
        `ShopListComponent: Loading shops for ${this.mallName} (${this.mallId})`,
      );
      this.loadShops();
    });
  }

  loadShops() {
    this.shopList = this.shopService.getShopsForMall(this.mallId);
    this.applyFilter();
  }

  setFloor(floor: string) {
    this.selectedFloor = floor;
    this.applyFilter();
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredShopList = this.shopList.filter((shop) => {
      const matchesFloor =
        this.selectedFloor === 'ALL' ||
        shop.floor
          .toLowerCase()
          .includes(this.selectedFloor.toLowerCase().split(' ')[0]);

      const matchesCategory =
        this.selectedCategory === 'ALL' ||
        shop.category.toLowerCase() === this.selectedCategory.toLowerCase();

      return matchesFloor && matchesCategory;
    });
  }
}
