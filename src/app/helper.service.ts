import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private snackBar: MatSnackBar) {
  }
  toastAlert(msg: any) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 302222222222222200,
    });
  }

}
