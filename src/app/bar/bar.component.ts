import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CameraComponent} from '../camera/camera.component';
import {RequestBarStockComponent} from './request-bar-stock/request-bar-stock.component';
import {RecordBarExpenseComponent} from './record-bar-expense/record-bar-expense.component';
import {DozerApiService} from '../dozer-api.service';
import {DataHolderService} from '../data-holder.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  drinksList: any[] = [];
  ordersToday: any[] = [];
  expensesToday: any[] = [];

  constructor(public dialog: MatDialog ,
              public dozerApiService: DozerApiService ,
              public dataHolderService: DataHolderService)  { }

  ngOnInit() {

    this.dozerApiService.getDrinksStockLevels().subscribe(data => {
      this.drinksList =  data;
    });

    this.dozerApiService.getTodayBarOrders( this.dataHolderService.get_today_range())
      .subscribe(data => {
        data.forEach( value => {
          value.order_details = JSON.parse(value.order_details);
          let total = 0;
          value.order_details.forEach( det => {
            total = total + (det.price * det.count);
          });
          value.total = total;
        });
        this.ordersToday =  data;
      });

    this.dozerApiService.getTodayBarExpenses( this.dataHolderService.get_today_range())
      .subscribe(data => {
        this.expensesToday =  data;
      });

  }

  requestBarStock() {
    const dialogRef = this.dialog.open(RequestBarStockComponent , {
      height: '400px',
      width: '600px',
    });
  }

  recordBarExpense() {
    const dialogRef = this.dialog.open(RecordBarExpenseComponent , {
      height: '400px',
      width: '800px',
    });
  }

  requestRefill(productId) {
    this.dozerApiService.requestProductRefill(productId).subscribe( data => {
    });
  }
}
