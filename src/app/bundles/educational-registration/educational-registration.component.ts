import {Component, OnInit} from '@angular/core';
import {EducationalRegistrationService} from './services/educational-registration.service';
import {ActivatedRoute} from '@angular/router';
import {PedagogyService} from '../pedagogy/services/pedagogy.service';

@Component ({
  selector: 'app-educational-registration',
  templateUrl: './educational-registration.component.html',
  styleUrls: ['./educational-registration.component.scss']
})
export class EducationalRegistrationComponent implements OnInit {
  registrations: any;
  constructor(private educationalRegistrationService: EducationalRegistrationService,
              private route: ActivatedRoute,
              private pedagogyService: PedagogyService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe (params => {
      const id = Number (params.get ('id'));
      this.educationalRegistrationService.getStudentRegistration (id).pipe ().subscribe (data => {
        this.registrations = data;
        this.educationalRegistrationService.emitRegistrations (this.registrations);
      });
    });
  }

}
