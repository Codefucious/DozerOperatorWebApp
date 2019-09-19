import { Component, OnInit } from '@angular/core';
import {DozerApiService} from '../../dozer-api.service';
import {MatDialog} from '@angular/material';
import {NotificationsService} from 'angular2-notifications';

export interface Expense {
  description: string ;
  amount: number;
  timing: number;
}

@Component({
  selector: 'app-record-kitchen-expense',
  templateUrl: './record-kitchen-expense.component.html',
  styleUrls: ['./record-kitchen-expense.component.css']
})
export class RecordKitchenExpenseComponent implements OnInit {


  description = '';
  historicalExpense = '';
  history: any;
  amount = 0;
  expense: Expense;

  constructor( public dozerApiService: DozerApiService , public dialog: MatDialog , public alertService: NotificationsService
               ) { }

  ngOnInit() {
    this.dozerApiService.getKitchenExpensesHistory().subscribe(
      data => {
        this.history = data;
      });
  }

  saveExpense() {
    this.expense = { description: this.description , amount: this.amount , timing: new Date().getTime()};
    this.dozerApiService.saveNewKitchenExpense(this.expense).subscribe(
      (data) => {
        this.dialog.closeAll();
        this.alertService.success('New Expense' , 'Expense Added Successfully!');
      }, error1 => {
        this.dialog.closeAll();
        this.alertService.error('An Error Occurred!' , error1.message);
      });
  }

  historySelected() {
    console.log(this.historicalExpense);
    const details = this.historicalExpense.split('---') ;
    this.description = details[0];
    this.amount =  + details[1];
  }
}
