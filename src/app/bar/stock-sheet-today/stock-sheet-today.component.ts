import { Component, OnInit } from '@angular/core';
import {DozerApiService} from '../../dozer-api.service';
import {RecordBarExpenseComponent} from '../record-bar-expense/record-bar-expense.component';
import {MatDialog} from '@angular/material';
import {ViewStocksheetProductSalesComponent} from './view-stocksheet-product-sales/view-stocksheet-product-sales.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface StockProduct {
  product_id: number;
  name: string;
  volume: string;
  remaining: string;
  sales_amount_on_date: string;
  transfers_counter: string;
  sales_counter: string;
  sales_details_on_date: string;
  defective: string;
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
  selector: 'app-stock-sheet-today',
  templateUrl: './stock-sheet-today.component.html',
  styleUrls: ['./stock-sheet-today.component.css']
})
export class StockSheetTodayComponent implements OnInit {

  displayedColumns: string[] = ['name', 'volume', 'remaining', 'transfers_counter', 'total', 'left', 'defective', 'sales_amount_on_date' , 'sales_details_on_date' ];
  productsList: StockProduct[] = [];
  dataSource = this.productsList;
  constructor( public dozerApiService: DozerApiService , public dialog: MatDialog) { }

  ngOnInit() {

    this.dozerApiService.getStockSheet( new Date().getTime() + '')
      .subscribe( data => {
          this.dataSource = data as StockProduct[];

      });
  }

  viewSales(sales , name) {
    const dialogRef = this.dialog.open(ViewStocksheetProductSalesComponent , {
      height: '600px',
      width: '400px',
      data: { sales , name}
    });
  }

}
