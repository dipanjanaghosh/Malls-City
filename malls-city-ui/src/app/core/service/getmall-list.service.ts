import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetMallListService {
  constructor() {}

  getMallListForSelectedCity() {
    return ([
      {
        id: 'shj4658cc6cc45cx',
        name: 'Pheonix Mall',
        city: 'Pune',
        cityCode: 10,
        description: 'Mall is largest in Pune and famous for kids',
        noOfFloors: 4,
        address: 'Pune xyz street,74001',
        img: '../../../../assets/images/m1.jpg',
      },
      {
        id: 'shj4658cc6cc45cx',
        name: 'Axis Mall',
        city: 'Kolkata',
        cityCode: 10,
        description: 'Mall is largest in kolkata and famous for kids',
        noOfFloors: 4,
        address: 'Kolkata xyz street,74001',
        img: '../../../../assets/images/m2.jpg',
      },
      {
        id: 'shj4658cc6cc45cx',
        name: 'Hinjewadi Mall',
        city: 'Pune',
        cityCode: 10,
        description: 'Mall is largest in Pune and famous for kids',
        noOfFloors: 4,
        address: 'Pune xyz street,74001',
        img: '../../../../assets/images/m3.jpg',
      },
      {
        id: 'shj4658cc6cc45cx',
        name: 'Southcity Mall',
        city: 'Kolkata',
        cityCode: 10,
        description: 'Mall is largest in Kolkata and famous for kids',
        noOfFloors: 4,
        address: 'Kolkata xyz street,74001',
        img: '../../../../assets/images/m3.jpg',
      },
      {
        id: 'shj4658cc6cc45cx',
        name: 'Amanora Mall',
        city: 'Pune',
        cityCode: 10,
        description: 'Mall is largest in Pune and famous for kids',
        noOfFloors: 4,
        address: 'Pune xyz street,74001',
        img: '../../../../assets/images/m1.jpg',
      },
      {
        id: 'shj4658cc6cc45cx',
        name: 'Quest Mall',
        city: 'Kolkata',
        cityCode: 10,
        description: 'Mall is largest in Kolkata and famous for kids',
        noOfFloors: 4,
        address: 'Kolkata xyz street,74001',
        img: '../../../../assets/images/m2.jpg',
      },
    ]);
  }
}
