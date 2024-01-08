import { TestBed } from '@angular/core/testing';

import { ConfirmationManagerService } from './confirmation-manager.service';

describe('ConfirmationManagerService', () => {
  let service: ConfirmationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
