import { TestBed } from '@angular/core/testing';

import { AccountlookupResolver } from './accountlookup.resolver';

describe('PwdResolver', () => {
  let resolver: AccountlookupResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AccountlookupResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
