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
    this.authService.currentUser.subscribe((data) => {
      this.user = data.user;
      this.showOrHideUsername();
    });
  }

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
    console.log('header.component.ts: Logout');
    this.authService.logout();
    this.user = {};
    this.isShowUserName = false;
    this.router.navigate(['/']); // Redirect to home page after logout
  }

  homeButtonClick() {
    console.log('Home button clicked!');
    this.router.navigate(['/']);
  }
  adminButtonClick() {
    console.log('Admin button clicked!');
    this.router.navigate(['/admin']);
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
