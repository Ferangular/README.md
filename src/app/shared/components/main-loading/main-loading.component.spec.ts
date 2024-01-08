import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoadingComponent } from './main-loading.component';

describe('MainLoadingComponent', () => {
  let component: MainLoadingComponent;
  let fixture: ComponentFixture<MainLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainLoadingComponent]
    });
    fixture = TestBed.createComponent(MainLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
