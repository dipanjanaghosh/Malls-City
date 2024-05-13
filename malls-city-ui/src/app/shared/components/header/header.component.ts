import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent {
  headerTitle: string = 'Malls@City';
  //showAddCity = false;

  constructor() {}

  // openModal() {
  //   const modal = document.getElementById('accountModal')!;
  //   modal.style.display = 'block'; // Make the modal visible
  //   this.showAddCity = true;
  // }

  // closeModal() {
  //   const modal = document.getElementById('accountModal')!;
  //   modal.style.display = 'none'; // Hide the modal
  //   this.showAddCity = false;
  // }
}
