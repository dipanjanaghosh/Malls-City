import { Injectable } from '@angular/core';
import { ShopItem } from '../models/shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor() {}

  getShopsForMall(mallId: string): ShopItem[] {
    return [
      {
        id: 's1',
        name: 'Shop Name',
        mallId: 'shj4658cc6cc45cx',
        category: 'Clothes',
        description: 'Trendy clothing & accessories.',
        floor: '3rd Floor',
        address: 'Kolkata-700001',
        contactNumber: 'Ph No. - 9800410022',
        img: '../../../../assets/images/m1.jpg',
        rating: 4.5,
      },
      {
        id: 's2',
        name: 'Shop Name',
        mallId: 'shj4658cc6cc45cx',
        category: 'Resturent',
        description: 'Delicious food & beverages.',
        floor: '3rd Floor',
        address: 'Kolkata-700001',
        contactNumber: 'Ph No. - 9800410022',
        img: '../../../../assets/images/m2.jpg',
        rating: 4.8,
      },
      {
        id: 's3',
        name: 'Shop Name',
        mallId: 'shj4658cc6cc45cx',
        category: 'Kids Zone',
        description: 'Fun & play area for children.',
        floor: '3rd Floor',
        address: 'Kolkata-700001',
        contactNumber: 'Ph No. - 9800410022',
        img: '../../../../assets/images/m3.jpg',
        rating: 4.9,
      },
      {
        id: 's4',
        name: 'Shop Name',
        mallId: 'shj4658cc6cc45cx',
        category: 'Saloon',
        description: 'Professional grooming services.',
        floor: '3rd Floor',
        address: 'Kolkata-700001',
        contactNumber: 'Ph No. - 9800410022',
        img: '../../../../assets/images/m4.jpg',
        rating: 4.6,
      },
      {
        id: 's5',
        name: 'H&M',
        mallId: 'mall-id-1',
        category: 'Clothes',
        description: 'Global fashion retailer.',
        floor: '1st Floor',
        address: 'Pune-411014',
        contactNumber: 'Ph No. - 9988776655',
        img: '../../../../assets/images/m1.jpg',
        rating: 4.5,
      },
    ];
  }
}
