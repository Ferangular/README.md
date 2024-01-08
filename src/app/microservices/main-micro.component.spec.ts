import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMicroComponent } from './main-micro.component';

describe('MainMicroComponent', () => {
  let component: MainMicroComponent;
  let fixture: ComponentFixture<MainMicroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainMicroComponent]
    });
    fixture = TestBed.createComponent(MainMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
