import { TestBed } from '@angular/core/testing';

import { SchoolyearService } from './schoolyear.service';

describe('SchoolyearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolyearService = TestBed.get(SchoolyearService);
    expect(service).toBeTruthy();
  });
});
