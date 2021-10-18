import { TestBed } from '@angular/core/testing';

import { AccountlookupService } from './lookup.service';

describe('AccountlookupService', () => {
  let service: AccountlookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountlookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
