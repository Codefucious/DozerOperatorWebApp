import { Component, OnInit } from '@angular/core';
import {Product} from '../new-order-view/new-order-view.component';
import {DozerApiService} from '../dozer-api.service';
import {DataHolderService} from '../data-holder.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-waiter-selector',
  templateUrl: './waiter-selector.component.html',
  styleUrls: ['./waiter-selector.component.css']
})
export class WaiterSelectorComponent implements OnInit {



  selectedCount = 0;
  cart_items: Product[];
  all_items: Product[];
  cart_total = 0;
  items_store_var = '';

  cart_has_items = false;
  tableNumber = 0;

  tables: any;



  constructor(private dozerApiService: DozerApiService ,
              private dataHolderService: DataHolderService ,
              private _route: ActivatedRoute ,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.all_items = [ ];

    this.dozerApiService.getAllForSale().subscribe(
      data => {
        this.dataHolderService.storeNewAllForSale(data);
        this.dataHolderService.storedAllForSale.subscribe(
          allForSale => {this.all_items = allForSale as Product[]; });
      });


    this.dataHolderService.storedUserInfo
      .subscribe( info => {
        this.dozerApiService.getTables(info.id ).subscribe(
          data => {
            this.tables = data;
          });
      });

    // this.selectTable('T1');

    this.items_store_var = JSON.stringify(this.all_items);
    this.cart_items = [];

    // this._route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.tableNumber =  (params.get('table_number')) * 1)
    // );
    this.tableNumber = this._route.snapshot.paramMap.get('table_number') as unknown as number;
    console.log(this.tableNumber);
    // this.dataHolderService.storedTableNumber.subscribe( data => {
    //   this.tableNumber = data;
    // });
    this.dataHolderService.storeNewHidePosButton(true);

  }

  addToCart(id) {
    this.selectedCount++;
    if (this.cart_items.filter(item => item.id === id).length === 0) {
      this.all_items.filter(item => item.id === id)[0].count = this.all_items.filter(item => item.id === id)[0].count - 1;
      const sel_item_index = this.all_items.findIndex(item => item.id === id);
      this.cart_items.push({id: this.all_items[sel_item_index].id ,
        barcode: this.all_items[sel_item_index].barcode,
        name: this.all_items[sel_item_index].name,
        type: this.all_items[sel_item_index].type,
        shots_count: this.all_items[sel_item_index].shots_count,
        is_shooter: this.all_items[sel_item_index].is_shooter,
        count: 1,
        ingredients: this.all_items[sel_item_index].ingredients,
        price: this.all_items[sel_item_index].price });
      this.cart_total = this.cart_total + this.all_items[sel_item_index].price;
      this.cart_has_items = true;
    } else {
      this.all_items.filter(item => item.id === id)[0].count = this.all_items.filter(item => item.id === id)[0].count - 1;
      this.cart_items[
        this.cart_items.findIndex(item => item.id === id)].count = this.cart_items
        [this.cart_items.findIndex(item => item.id === id)].count + 1;
      this.cart_total = this.cart_total + this.cart_items.filter(item => item.id === id)[0].price;
    }

    const item_index = this.all_items.findIndex(item => item.id === id);
    if (this.all_items[item_index].count === 0) {
      if (this.all_items.filter(item => item.id === id)[0].type !== 2) {
        this.all_items.splice(item_index, 1);
      }
    }
    console.log(this.cart_items);

  }

  removeFromCart(id: number) {
    this.selectedCount--;
    if (this.all_items.filter(item => item.id === id).length === 0) {
      this.cart_items.filter(item => item.id === id)[0].count = this.cart_items.filter(item => item.id === id)[0].count - 1;
      const sel_item_index = this.cart_items.findIndex(item => item.id === id);
      this.all_items.push({id: this.cart_items[sel_item_index].id ,
        barcode: this.cart_items[sel_item_index].id,
        name: this.cart_items[sel_item_index].name,
        type: this.cart_items[sel_item_index].type,
        ingredients: this.cart_items[sel_item_index].ingredients,
        shots_count: this.cart_items[sel_item_index].shots_count,
        is_shooter: this.cart_items[sel_item_index].is_shooter,
        count: 1,
        price: this.cart_items[sel_item_index].price });
      this.cart_total = this.cart_total - this.cart_items[sel_item_index].price;

    } else {
      this.cart_items.filter(item => item.id === id)[0].count = this.cart_items.filter(item => item.id === id)[0].count - 1;
      this.all_items[
        this.all_items.findIndex(item => item.id === id)].count = this.all_items
        [this.all_items.findIndex(item => item.id === id)].count + 1;
      this.cart_total = this.cart_total - this.cart_items.filter(item => item.id === id)[0].price;
    }

    const item_index = this.cart_items.findIndex(item => item.id === id);
    if (this.cart_items[item_index].count === 0) {
      this.cart_items.splice(item_index, 1);
    }
    if (this.cart_items.length === 0){
      this.cart_has_items = false;
    }

  }

  selectTable(a4: string) {
    this.dataHolderService.storeNewTableNumber(a4);
  }

  addToPending() {
    const record = {table_number: this.tableNumber, orders: this.cart_items, total_amount: this.cart_total, handler: 'HASSAN KITUFE' };
    console.log(record);
    this.dozerApiService.addToTablePending(record).subscribe(data => {
      console.log('done baby! Done.');
    });
  }

}
