import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolyearService } from './services/schoolyear.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { SchoolyearModel } from './models/schoolyear.model';

@Component({
  selector: 'app-schoolyear',
  templateUrl: './schoolyear.component.html',
  styleUrls: ['./schoolyear.component.scss']
})
export class SchoolyearComponent implements OnInit {
  pageIndex: number;
  pageSize: number;
  length: number;
  data: any;
  listschoolyears: any;
  subscription: Subscription;
  displayedColumns: string[] = ['label', 'startDate', 'endDate', 'active'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  pageEvent: PageEvent;
  constructor(private schoolyearService: SchoolyearService) {

  }

  ngOnInit() {
    // Récupération de la fiche fournisseur
    this.schoolyearService.getSchoolyears().pipe().subscribe(data => {
      this.listschoolyears = new MatTableDataSource<SchoolyearModel>(data);
      this.pageSize = 20;
      this.length = data.length;
      this.pageIndex = 1;
      this.listschoolyears.sort = this.sort;
      this.listschoolyears.paginator = this.paginator;
    });
  }
}
