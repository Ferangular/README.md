import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStoreComponent } from './form-store.component';

describe('FormStoreComponent', () => {
  let component: FormStoreComponent;
  let fixture: ComponentFixture<FormStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormStoreComponent]
    });
    fixture = TestBed.createComponent(FormStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
