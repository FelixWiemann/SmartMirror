import { TestBed } from '@angular/core/testing';

import { GaspriceService } from './gasprice.service';

describe('GaspriceService', () => {
  let service: GaspriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaspriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
