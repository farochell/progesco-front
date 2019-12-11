import {Component, OnInit} from '@angular/core';
import {APPCONFIG} from '../../constants/app-constants';
import {ActivatedRoute} from '@angular/router';
import {SchoolyearModel} from '../../bundles/schoolyear/models/schoolyear.model';
import {Observable} from 'rxjs';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cnf: string[] = [];
  schoolyear: Observable<SchoolyearModel>;

  constructor(private route: ActivatedRoute) {
    // route.data.map((data: { schoolyear: SchoolyearModel } => data.schoolyear);

    this.route.data.subscribe (data => {
      return this.schoolyear = data.schoolyear;
    });

  }

  ngOnInit() {
    this.cnf = APPCONFIG;
  }

}
