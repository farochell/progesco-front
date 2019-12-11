import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalRegistrationListComponent } from './educational-registration-list.component';

describe('EducationalRegistrationListComponent', () => {
  let component: EducationalRegistrationListComponent;
  let fixture: ComponentFixture<EducationalRegistrationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalRegistrationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
