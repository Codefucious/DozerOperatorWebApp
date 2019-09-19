import { Component, OnInit } from '@angular/core';
import {RequestBarStockComponent} from '../bar/request-bar-stock/request-bar-stock.component';
import {RecordBarExpenseComponent} from '../bar/record-bar-expense/record-bar-expense.component';
import {MatDialog} from '@angular/material';
import {RecordKitchenExpenseComponent} from './record-kitchen-expense/record-kitchen-expense.component';
import {RequestKitchenStockComponent} from './request-kitchen-stock/request-kitchen-stock.component';
import {DozerApiService} from '../dozer-api.service';
import {DataHolderService} from '../data-holder.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  ingredientsList: any[] = [];
  ordersToday: any[] = [];
  expensesToday: any[] = [];


  gaugeType = 'semi';
  gaugeValue = 28.3;
  gaugeLabel = '';
  gaugeAppendText = '%';
  thresholdConfig = {
    0: {color: 'red'},
    40: {color: 'orange'},
    75.5: {color: 'green'}
  };

  constructor(public dialog: MatDialog ,
              public dozerApiService: DozerApiService ,
              public dataHolderService: DataHolderService) { }

  ngOnInit() {
      this.dozerApiService.getIngredientsStockLevels().subscribe(data => {
        this.ingredientsList =  data;
      });

      this.dozerApiService.getTodayKitchenOrders( this.dataHolderService.get_today_range())
        .subscribe(data => {
            data.forEach( value => {
              value.order_details = JSON.parse(value.order_details);
              let total = 0;
              value.order_details.forEach( det => {
                total = total + det.price;
              });
              value.total = total;
              });
            this.ordersToday =  data;
      });

      this.dozerApiService.getTodayKitchenExpenses( this.dataHolderService.get_today_range())
        .subscribe(data => {
        this.expensesToday =  data;
      });
  }


  requestKitchenStock() {
    const dialogRef = this.dialog.open(RequestKitchenStockComponent , {
      height: '400px',
      width: '600px',
    });
  }

  recordKitchenExpense() {
    const dialogRef = this.dialog.open(RecordKitchenExpenseComponent , {
      height: '400px',
      width: '800px',
    });
  }

  requestRefill(productId) {
    const id = ('' + productId).replace('99999' , '');
    this.dozerApiService.requestIngredientRefill(id).subscribe( data => {

    });
  }

  isRequested(requested) {
    return (requested === 1);
  }
}
