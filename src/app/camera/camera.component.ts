import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  scanned = false;
  scannedNum: any;
  constructor(public dialogRef: MatDialogRef<CameraComponent>) { }

  ngOnInit() {
  }

  decodedOutput(num) {
    console.log(num);
    this.scannedNum = num;
    this.scanned = true;
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  openOrderView() {
    this.dialogRef.close('done~' + this.scannedNum);
  }
  openTableManagerView() {
    this.dialogRef.close('tables~' + this.scannedNum);
  }
}
