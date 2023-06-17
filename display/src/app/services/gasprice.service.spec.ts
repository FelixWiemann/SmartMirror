import { TestBed } from '@angular/core/testing';

import { GaspriceService } from './gasprice.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('GaspriceService', () => {
  let service: GaspriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]});
    service = TestBed.inject(GaspriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
