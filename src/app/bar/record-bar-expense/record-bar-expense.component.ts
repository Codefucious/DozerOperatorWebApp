import { Component, OnInit } from '@angular/core';
import {DozerApiService} from '../../dozer-api.service';
import {MatDialog} from '@angular/material';
import {NotificationsService} from 'angular2-notifications';
import {Expense} from '../../kitchen/record-kitchen-expense/record-kitchen-expense.component';

@Component({
  selector: 'app-record-bar-expense',
  templateUrl: './record-bar-expense.component.html',
  styleUrls: ['./record-bar-expense.component.css']
})
export class RecordBarExpenseComponent implements OnInit {


  description = '';
  historicalExpense = '';
  history: any;
  amount = 0;
  expense: Expense;

  constructor( public dozerApiService: DozerApiService , public dialog: MatDialog , public alertService: NotificationsService
  ) { }

  ngOnInit() {
    this.dozerApiService.getBarExpensesHistory().subscribe(
      data => {
        this.history = data;
      });
  }

  saveExpense() {
    this.expense = { description: this.description , amount: this.amount , timing: new Date().getTime()};
    this.dozerApiService.saveNewBarExpense(this.expense).subscribe(
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
