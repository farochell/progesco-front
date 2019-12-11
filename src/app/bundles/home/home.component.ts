import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  schoolyear: any;
  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.data.subscribe(data => {
      console.log(data);
    });
  }

}
