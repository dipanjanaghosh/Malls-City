import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  headerTitle: string = 'Malls@City';
  //showAddCity = false;
  user: any;
  isShowUserName = false;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // fetch user information
    // this.fetchUserInformation();
    this.authService.currentUser.subscribe((data) => {
      this.user = data.user;
      console.log('user from header', this.user);
      this.showOrHideUsername();
    });
  }

  // fetchUserInformation() {
  //   if (localStorage.getItem('currentUser')) {
  //     this.user = JSON.parse(localStorage.getItem('currentUser') || '')?.user;
  //     console.log('user', this.user);
  //     if (this.user.username) {
  //       this.showOrHideUsername();
  //     }
  //   }
  // }

  showOrHideUsername() {
    this.isShowUserName = this.checkAdminRoute();
  }

  checkAdminRoute(): boolean {
    let isAdminRoute = false;
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        isAdminRoute = event.url.includes('/admin'); // Adjust as needed
        this.isShowUserName = isAdminRoute;
        console.log(
          'Is Admin Route:',
          isAdminRoute,
          'isShowUserName:',
          this.isShowUserName
        );
      });
    return isAdminRoute;
  }

  logout() {
    console.log('Logout');
    localStorage.removeItem('currentUser');
    this.user = {};
    this.isShowUserName = false;
    this.router.navigate(['/']); // Redirect to home page after logout
  }
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
