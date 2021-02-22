import { TestBed } from '@angular/core/testing';

import { StuGuardGuard } from './stu-guard.guard';

describe('StuGuardGuard', () => {
  let guard: StuGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StuGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
