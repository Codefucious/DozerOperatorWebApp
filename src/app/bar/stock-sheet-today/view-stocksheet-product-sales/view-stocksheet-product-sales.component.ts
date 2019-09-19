import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-stocksheet-product-sales',
  templateUrl: './view-stocksheet-product-sales.component.html',
  styleUrls: ['./view-stocksheet-product-sales.component.css']
})
export class ViewStocksheetProductSalesComponent implements OnInit {
  salesToday = [];
  sale = {} as any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

   const sales = (this.data.sales);
   sales.forEach( value => {
     this.salesToday.push({ description : value.split(':')[1].split('=')[0] ,
                            timing : value.split(':')[0] , amount : value.split('=')[1] });
   });

  }

}
