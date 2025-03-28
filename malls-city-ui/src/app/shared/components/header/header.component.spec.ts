// header.component.spec.ts
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Directive, Input } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  const mockUser = { username: 'testUser' };

  // Mock appHighlightsColor directive
  @Directive({
    selector: '[appHighlightsColor]',
  })
  class MockHighlightsColorDirective {
    @Input() appHighlightsColor: any;
  }

  beforeEach(async () => {
    // Mock AuthService
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser: of({ user: mockUser }), // Mock observable
    });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, MockHighlightsColorDirective],
      imports: [
        MatToolbarModule,
        MatIconModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          { path: '', component: HeaderComponent }, // Root route for home
          { path: 'home', component: HeaderComponent },
          { path: 'admin', component: HeaderComponent },
        ]),
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    router = TestBed.inject(Router); // Inject Router
  });

  beforeEach(() => {
    try {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); // to terigger ngOnInit
    } catch (error) {
      console.error('Component creation failed:', error);
      throw error;
    }
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to authService.currentUser and set user', () => {
      expect(component.user).toEqual(mockUser);
      expect(component.isShowUserName).toBeFalse(); // Initially false until route check
    });
  });

  describe('showOrHideUsername', () => {
    it('should call checkAdminRoute and update isShowUserName', () => {
      spyOn(component, 'checkAdminRoute').and.returnValue(true);
      component.showOrHideUsername();
      expect(component.checkAdminRoute).toHaveBeenCalled();
      expect(component.isShowUserName).toBeTrue();
    });
  });

  describe('checkAdminRoute', () => {
    it('should return false and set isShowUserName to false for non-admin route', fakeAsync(() => {
      router.navigateByUrl('/home');
      tick(); // Wait for navigation to complete
      fixture.detectChanges();
      expect(component.isShowUserName).toBeFalse();
    }));

    it('should return true and set isShowUserName to true for admin route', fakeAsync(() => {
      router.navigateByUrl('/admin');
      tick(); // Wait for navigation to complete
      fixture.detectChanges();
      expect(component.isShowUserName).toBeTrue();
    }));
  });

  describe('logout', () => {
    it('should call authService.logout, clear user, and navigate to home', fakeAsync(() => {
      component.user = mockUser;
      component.isShowUserName = true;

      // Spy on router.navigate
      spyOn(router, 'navigate').and.callThrough();

      component.logout();

      tick(); // Wait for any async navigation

      expect(authServiceSpy.logout).toHaveBeenCalled();
      expect(component.user).toEqual({});
      expect(component.isShowUserName).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));
  });

  describe('template', () => {
    it('should display header title', () => {
      const titleElement = fixture.debugElement.query(By.css('.headerTitle'));
      expect(titleElement.nativeElement.textContent).toBe('Malls@City');
    });

    it('should show username when isShowUserName is true', () => {
      component.user = mockUser;
      component.isShowUserName = true;
      console.log(' user in template :', component.user);
      fixture.detectChanges();

      const usernameElement = fixture.debugElement.query(By.css('span.mx-2'));
      expect(usernameElement.nativeElement.textContent).toContain(
        'Hello: testUser'
      );
    });

    it('should not show username when isShowUserName is false', () => {
      component.user = mockUser;
      component.isShowUserName = false;
      fixture.detectChanges();

      const usernameElement = fixture.debugElement.query(By.css('span.mx-2'));
      expect(usernameElement).toBeNull();
    });

    it('should show logout button when user is logged in', () => {
      component.user = mockUser;
      fixture.detectChanges();

      const logoutButton = fixture.debugElement.query(By.css('.logout-icon'));
      expect(logoutButton).toBeTruthy();
    });

    it('should not show logout button when user is not logged in', () => {
      component.user = null;
      fixture.detectChanges();

      const logoutButton = fixture.debugElement.query(By.css('.logout-icon'));
      expect(logoutButton).toBeNull();
    });

    it('should call logout when logout button is clicked', () => {
      component.user = mockUser;
      fixture.detectChanges();

      spyOn(component, 'logout');

      const logoutButton = fixture.nativeElement.querySelector(
        '[data-test="header-logout-button"]'
      );
      logoutButton.click();
      fixture.detectChanges();
      expect(component.logout).toHaveBeenCalled();
    });

    it('should navigate to home when home button is clicked', fakeAsync(() => {
      // Spy on router.navigate
      let homeBtn = spyOn(component, 'homeButtonClick');
      const homeButton = fixture.nativeElement.querySelector(
        '[data-test="home-button"]'
      );

      expect(homeButton).toBeTruthy(); // Verify button exists
      homeButton.click();
      fixture.detectChanges();
      flush(); // Use flush() to ensure all pending promises are resolved.
      expect(homeBtn).toHaveBeenCalled();
    }));

    it('should navigate to admin when admin button is clicked', fakeAsync(() => {
      // spyOn(router, 'navigate');
      let adminBtn = spyOn(component, 'adminButtonClick');
      const adminButton = fixture.nativeElement.querySelector(
        '[data-test="admin-button"]'
      );
      expect(adminButton).toBeTruthy(); // Verify button exists
      adminButton.click();
      fixture.detectChanges();
      tick(); // Wait for any async navigation
      expect(adminBtn).toHaveBeenCalled();
    }));
  });
});
