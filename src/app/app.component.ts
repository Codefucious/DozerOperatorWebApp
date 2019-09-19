import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CameraComponent} from './camera/camera.component';
import {DataHolderService} from './data-holder.service';
import {Router} from '@angular/router';
import {Spinkit} from 'ng-http-loader';
import {AuthenticationService} from './Auth/authentication-service.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Orders {
  table_number: string;
  orders: any;
  total_price: number;
  timing: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  touchView = false;
  cameraView = false;
  public spinkit = Spinkit;

  constructor(public dialog: MatDialog,
              private authenticationService: AuthenticationService ,
              private dataHolderService: DataHolderService,
              private router: Router) {

    this.dataHolderService.storeNewHidePosButton(false);
    this.dataHolderService.storedHidePosButton.subscribe(value => {
      this.cameraView =  value;
    });
  }


  fullscreenView() {
      /* Get the product you want displayed in fullscreen mode (a video in this example): */
      const elem = document.documentElement;

      /* When the openFullscreen() function is executed, open the video in fullscreen.
      Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
  }

  toggleView() {
    this.fullscreenView();
    this.dataHolderService.storeNewHidePosButton(true);
    this.touchView = true;
  }

  scanQR() {
  }

  openDialog(): void {
    this.cameraView =  true;
    const dialogRef = this.dialog.open(CameraComponent);

    dialogRef.afterClosed().subscribe(result => {
      const res = result.split('~')[0];

      if (res === 'done') {
        const data = result.split('~')[1];
        this.router.navigate(['waiter', { table_number : data }]);
        // this.dataHolderService.storeNewTableNumber('T1');
      } else if (res === 'tables') {
        const data = result.split('~')[1];
        this.router.navigate(['tables', { table_number : data }]);
        // this.dataHolderService.storeNewTableNumber('T1');
      } else {
        this.cameraView =  false;
      }

      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {

    if (this.authenticationService.hasAccessToken()){
      this.authenticationService.getUserInfo();
    }
  }



}
