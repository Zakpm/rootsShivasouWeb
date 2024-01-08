import { TestBed } from '@angular/core/testing';

import { IntercepteurInterceptor } from './intercepteur.interceptor';

describe('IntercepteurInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IntercepteurInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: IntercepteurInterceptor = TestBed.inject(IntercepteurInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
