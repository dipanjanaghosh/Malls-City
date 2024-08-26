import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from 'src/app/Material.Module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MaterialModule],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should have headerTitle', () => {
    const headerTitle: string = 'Malls@City';
    let h1 = fixture.nativeElement.querySelector('.headerTitle');
    console.log('Should have headerTitle---------', h1.textContent);
    expect(h1.textContent).toEqual(headerTitle);
  });

  it('Should have 3 buttons', () => {
    let h1 = fixture.debugElement.nativeElement.querySelectorAll('button');
    console.log('Should have 3 buttons -----:', h1.length);
    expect(h1.length).toEqual(3);
  });
});
