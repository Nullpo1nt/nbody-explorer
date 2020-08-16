import { TestBed } from '@angular/core/testing';

import { BodyProviderService } from './body-provider-service.service';

describe('BodyProviderService', () => {
  let service: BodyProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
