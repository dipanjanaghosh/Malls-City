import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallsComponent } from './malls.component';

describe('MallsComponent', () => {
  let component: MallsComponent;
  let fixture: ComponentFixture<MallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MallsComponent]
    });
    fixture = TestBed.createComponent(MallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
