import { TestBed } from '@angular/core/testing';

import { StuService } from './stu.service';

describe('StuService', () => {
  let service: StuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
