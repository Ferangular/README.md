import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingCarComponent } from './parking-car.component';

describe('ParkingCarComponent', () => {
  let component: ParkingCarComponent;
  let fixture: ComponentFixture<ParkingCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ParkingCarComponent]
    });
    fixture = TestBed.createComponent(ParkingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
