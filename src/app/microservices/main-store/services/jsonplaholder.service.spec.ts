import { TestBed } from '@angular/core/testing';

import { JsonplaholderService } from './jsonplaholder.service';

describe('JsonplaholderService', () => {
  let service: JsonplaholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonplaholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
