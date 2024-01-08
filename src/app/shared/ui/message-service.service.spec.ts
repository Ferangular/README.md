import { TestBed } from '@angular/core/testing';

import { MessageManagerService } from './message-manager.service';

describe('MessageServiceService', () => {
  let service: MessageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
