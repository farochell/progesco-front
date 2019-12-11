import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalRegistrationComponent } from './educational-registration.component';

describe('EducationalRegistrationComponent', () => {
  let component: EducationalRegistrationComponent;
  let fixture: ComponentFixture<EducationalRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
