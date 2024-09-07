import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { UnauthGuard } from './unauth.guard';

describe('unauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => UnauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
