import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {CookieService} from 'ngx-cookie-service';


interface NavNode {
  name: string;
  url?: string;
  icon?: string;
  children?: NavNode[];
}

const TREE_DATA: NavNode[] = [
  {
    name: 'Configuration',
    icon: 'settings',
    children: [
      {
        name: 'Années scolaires',
        url: '/admin/annee-scolaires'
      },
      {
        name: 'Pédagogie',
        url: '/admin/pedagogie'
      },
    ]
  },
  {
    name: 'Etudiants',
    icon: 'school',
    children: [
      {
        name: 'Liste des étudiants',
        url: '/admin/etudiants'
      }
    ]
  }

];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  treeControl = new NestedTreeControl<NavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavNode>();
  activeyear = 'UNKNOW';
  constructor(private cookieService: CookieService) {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit() {
    this.activeyear = this.cookieService.get('activeyear');
  }
  hasChild = (_: number, node: NavNode) => {
    return !!node.children && node.children.length > 0;
  }
}
