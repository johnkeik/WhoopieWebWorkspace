import { TestBed } from '@angular/core/testing';

import { WhoopieWebLibService } from './whoopie-web-lib.service';

describe('WhoopieWebLibService', () => {
  let service: WhoopieWebLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhoopieWebLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
