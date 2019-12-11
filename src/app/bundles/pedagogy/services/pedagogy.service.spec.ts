import { TestBed } from '@angular/core/testing';

import { PedagogyService } from './pedagogy.service';

describe('PedagogyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedagogyService = TestBed.get(PedagogyService);
    expect(service).toBeTruthy();
  });
});
