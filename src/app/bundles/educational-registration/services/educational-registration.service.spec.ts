import { TestBed } from '@angular/core/testing';

import { EducationalRegistrationService } from './educational-registration.service';

describe('EducationalRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationalRegistrationService = TestBed.get(EducationalRegistrationService);
    expect(service).toBeTruthy();
  });
});
