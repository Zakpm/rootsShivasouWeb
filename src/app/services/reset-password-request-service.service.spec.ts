import { TestBed } from '@angular/core/testing';

import { ResetPasswordRequestServiceService } from './reset-password-request-service.service';

describe('ResetPasswordRequestServiceService', () => {
  let service: ResetPasswordRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
