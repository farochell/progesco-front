import { Injectable } from '@angular/core';
import {
  MatSnackBar, MatSnackBarConfig,
  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition
} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar) { }
  openSnackBar(message: string, cssClass: string) {
    const configBar = new MatSnackBarConfig();
    configBar.horizontalPosition = this.horizontalPosition;
    configBar.verticalPosition = this.verticalPosition;
    configBar.duration = 2500;
    configBar.panelClass = cssClass;
    this.snackBar.open(message, undefined, configBar);
  }
}
