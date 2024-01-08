import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfigComponent } from './app.config.component';

describe('AppConfigComponent', () => {
  let component: AppConfigComponent;
  let fixture: ComponentFixture<AppConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppConfigComponent]
    });
    fixture = TestBed.createComponent(AppConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
