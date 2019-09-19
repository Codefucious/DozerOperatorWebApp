import { Component, OnInit } from '@angular/core';
import {DozerApiService} from '../dozer-api.service';
import {DataHolderService} from '../data-holder.service';
import {OrderDetailsComponent} from '../new-order-view/new-order-view.component';
import {MatDialog} from '@angular/material';
import {ChooseWaiterComponent} from '../new-order-view/choose-waiter/choose-waiter-component';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-table-bills-view',
  templateUrl: './table-bills-view.component.html',
  styleUrls: ['./table-bills-view.component.css']
})
export class TableBillsViewComponent implements OnInit {
  tables: any;

  constructor(private dozerApiService: DozerApiService ,
              private alertService: NotificationsService,
              public dialog: MatDialog,
              private dataHolderService: DataHolderService) { }

  ngOnInit() {

    this.dozerApiService.getBilledTables().subscribe(
      data => {
        this.tables = data;
      });

  }

  printBill(table_number) {
    this.dozerApiService.getTableBill(table_number).subscribe(data => {
      console.log(data);
      this.dozerApiService.printBill(data , table_number).subscribe(data1 => {

      });
    });
  }

  clearBill(table_number: any) {
    const time = new Date().getTime() + ''
    this.dozerApiService.clearTableBill(table_number ,  time ).subscribe(data => {
      console.log(data);
    });
  }

  transferBill(table_id) {
    const dialogRef = this.dialog.open(ChooseWaiterComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (Object.keys(result).length > 0) {
        this.dozerApiService.transferBill(table_id , result.id , result.name  ).subscribe(
          data => {
            this.alertService.success(
              'Bill Transferred to '+ result.name
            );
            this.dozerApiService.getBilledTables().subscribe(
              data2 => {
                this.tables = data2;
              });
          });
      }
    });
  }
}
