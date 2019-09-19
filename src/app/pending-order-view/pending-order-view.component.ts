import { Component, OnInit } from '@angular/core';
import {DozerApiService} from '../dozer-api.service';
import {DataHolderService} from '../data-holder.service';

@Component({
  selector: 'app-pending-order-view',
  templateUrl: './pending-order-view.component.html',
  styleUrls: ['./pending-order-view.component.css']
})
export class PendingOrderViewComponent implements OnInit {

  constructor(private dozerApiService: DozerApiService,
              private dataHolderService: DataHolderService) { }

  displayedColumns: string[] = ['table_number', 'handler' , 'orders', 'total_amount' , 'print'];
  orderList: any [] = [
    {name: 'Wali Nyama', price: '3200', count: 3 },
    {name: 'Wali Nyama', price: '3200', count: 3 },
    {name: 'Wali Nyama', price: '3200', count: 3 },
  ];

  touchView = false;
  PendingOrders: any[] = [
    {table_number: 1, orders: this.orderList, total_amount: 1500, handler: 'HASSAN KITUFE' },
    {table_number: 2, orders: this.orderList, total_amount: 1500, handler: 'KHADIJA ZOBA' },
    {table_number: 3, orders: this.orderList, total_amount: 1500, handler: 'NAZIBA ABDULI' },
    {table_number: 5, orders: this.orderList, total_amount: 1500, handler: 'MASOUD LIPANYA' },
    {table_number: 1, orders: this.orderList, total_amount: 1500, handler: 'HASSAN KITUFE' },
    {table_number: 2, orders: this.orderList, total_amount: 1500, handler: 'KHADIJA ZOBA' },
    {table_number: 3, orders: this.orderList, total_amount: 1500, handler: 'NAZIBA ABDULI' },
    {table_number: 5, orders: this.orderList, total_amount: 1500, handler: 'MASOUD LIPANYA' },
    {table_number: 1, orders: this.orderList, total_amount: 1500, handler: 'HASSAN KITUFE' },
    {table_number: 2, orders: this.orderList, total_amount: 1500, handler: 'KHADIJA ZOBA' },
    {table_number: 3, orders: this.orderList, total_amount: 1500, handler: 'NAZIBA ABDULI' },
    {table_number: 5, orders: this.orderList, total_amount: 1500, handler: 'MASOUD LIPANYA' },

  ];


  ngOnInit() {
    this.dozerApiService.getPendingOrders().subscribe((data) => {
      data.forEach( (value) => {
          value.orders = JSON.parse(value.orders);
      } );
      this.PendingOrders = data;
    });
  }

  printPendingOrderTicket(tableNum  , orders , id , total , handlerId , handlerName) {

    // let userInfo: any = {};
    // this.dataHolderService.storedUserInfo
    //   .subscribe( info => {
    //     userInfo = info;
    //   });

    const checkoutDetails = {
      timing : Date.now().toString() , details : orders ,
      cart_total : total , allowance : 0 ,
      handler_id : handlerId , handler_name : handlerName  , table_number: tableNum
    };

    console.log(id);
    console.log(checkoutDetails);
    this.dozerApiService.addToTableBill(tableNum , checkoutDetails).subscribe(
      data => {
        this.dozerApiService.printTicket(checkoutDetails).subscribe(data1 => {
          console.log('print ticket');
          console.log(checkoutDetails);
          this.dozerApiService.deletePendingOrder(id).subscribe(data2 => {
            this.dozerApiService.getPendingOrders().subscribe((data3) => {
              data3.forEach( (value) => {
                value.orders = JSON.parse(value.orders);
              } );
              this.PendingOrders = data3;
            });
          });
        });
        // this.clearCart();
        this.dozerApiService.getAllForSale().subscribe(
          item => {
            this.dataHolderService.storeNewAllForSale(item);
          });
      }
    );





  }
}
