import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DataHolderService} from '../data-holder.service';
import {DozerApiService} from '../dozer-api.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {CameraComponent} from '../camera/camera.component';
import {NotificationsService} from 'angular2-notifications';
import {take} from 'rxjs/operators';
import {ChooseWaiterComponent} from './choose-waiter/choose-waiter-component';
import {Router} from '@angular/router';

export interface Ingredient {
  product_id: number;
  quantity: number;
}

export interface Order {
  table_number: number; cart_items: any[]; cart_total: number;
}

export interface Product {
  id: number;
  type: number;
  barcode: number;
  name: string;
  count: number;
  price: number;
  is_shooter: number;
  shots_count: number;
  ingredients: Ingredient[];
}


@Component({
  selector: 'app-new-order-view',
  templateUrl: './new-order-view.component.html',
  styleUrls: ['./new-order-view.component.css']
})
export class NewOrderViewComponent implements OnInit {
  order = { table_number: 0 , cart_items: [] , cart_total: 0};

  cart_items: Product[];
  all_items: Product[];
  cart_total = 0;
  items_store_var = '';

  cart_has_items = false;
  tableNumber = 0;
  longPressed = false;
  tables: any;

  userInfo: any = {};
  @ViewChild('stepper' , { static : false}) stepper: MatStepper;

  constructor(private dozerApiService: DozerApiService ,
              private dataHolderService: DataHolderService ,
              public dialog: MatDialog ,
              private router: Router ,
              private alertService: NotificationsService) { }


  ngOnInit() {

    this.all_items = [ ];

    this.dozerApiService.getAllForSale().subscribe(
      data => {
        const datalist = data as any[];
        datalist.forEach(value => {
          if (value.is_shooter === 1) {
            value.price =  Math.round(value.price / value.shots_count);
          }
        });
        this.dataHolderService.storeNewAllForSale(datalist);
        this.dataHolderService.storedAllForSale.subscribe(
          allForSale => {this.all_items = allForSale as Product[]; });
      });

    this.dataHolderService.storedUserInfo
      .subscribe( info => {
        this.userInfo = info;
      });




    this.items_store_var = JSON.stringify(this.all_items);
    this.cart_items = [];

    this.dataHolderService.storedTableNumber.subscribe( data => {
      this.tableNumber = data;
    });

  }


  addToCart(id) {
    if (this.longPressed) {
      this.longPressed = false;
      return; }
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

  }

  removeFromCart(id: number) {
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
    if (this.cart_items.length === 0) {
      this.cart_has_items = false;
    }

  }

  selectTable(a4: string) {
    this.dataHolderService.storeNewTableNumber(a4);
    this.stepper.next();
  }

  confirmBill() {
    if (this.router.url === '/waiter_app') {
      this.dataHolderService.storedUserInfo
        .subscribe( info => {
          this.userInfo = info;
        });
    }

    const checkoutDetails = {
      timing : Date.now().toString() , details : this.cart_items ,
      cart_total : this.cart_total , allowance : 0 ,
      handler_id : this.userInfo.id , handler_name : 'Dozer Op' , table_number: this.tableNumber
    };

    console.log(this.userInfo);


    const record = {table_number: this.tableNumber, orders: this.cart_items, total_amount: this.cart_total, handler:  this.userInfo.name  , handler_id:  this.userInfo.id  };
    console.log(record);
    this.dozerApiService.addToTablePending(record).subscribe(data => {
      console.log('done baby! Done.');
      this.alertService.success(
        'Bill Added Successfully!' ,
        'Table : ' + this.tableNumber
      );
      this.dozerApiService.getAllForSale().subscribe(
        item => {
          this.dataHolderService.storeNewAllForSale(item);
          setTimeout(() => {
            this.cart_items = [];
            this.cart_total = 0;
            this.cart_has_items = false;
            this.stepper.reset();
          }, 2000);
        });
    });



  }

  clearCart() {
    this.all_items = JSON.parse(this.items_store_var);
    this.cart_items = [];
    this.cart_total = 0;
    this.cart_has_items = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '600px',
      data: {cart_items: this.cart_items, total: this.cart_total}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'done') {
        this.cart_items = [];
        this.cart_total = 0;
      }
    });
  }

  openChooseWaiterDialog(): void {

    // If a waiter is using this component
    if (this.router.url === '/waiter_app') {
      this.dozerApiService.getTables(this.userInfo.id ).subscribe(
        data => {
          this.tables = data;
          this.stepper.next();
        });
      return;
    }

    const dialogRef = this.dialog.open(ChooseWaiterComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (Object.keys(result).length > 0) {
        this.userInfo.id = result.id;
        this.userInfo.name = result.name;
        this.dozerApiService.getTables(this.userInfo.id ).subscribe(
          data => {
            this.tables = data;
            this.stepper.next();
          });
      }
    });
  }

  alertUs(id , isShooter , shotCount) {
    this.longPressed = true;
    const dialogRef = this.dialog.open(LargeEntryComponent, {
      width: '400px',
      data: {item_id: id , isShooter , shotCount }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'done') {
        this.dataHolderService.storedLargeEntryAmount.pipe(take(1)).subscribe(data => {
          for (let i = 0; i < data; i++) {
            this.addToCart(id);
          }
        });

      }
    });
  }

  clearItem(id: number, count: number) {
    for (let i = 0; i < count; i++) {
      this.removeFromCart(id);
    }
  }
}

 // Order Details Popup
@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details-component.html',
})
export class OrderDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private dozerApiService: DozerApiService ,
    private alertService: NotificationsService) {}

  closeDialog(): void {
    this.dialogRef.close('cancel');
  }
  confirmOrder() {
    const checkoutDetails = {
      timing : Date.now().toString() , details : this.data.cart_items ,
      cart_total : this.data.total , allowance : 0 ,
      handler_id : '0' , handler_name : 'Dozer Op' , table_number: '0'
    };
    this.alertService.success(
      'Order Saved Successfully!'
    );
    console.log(checkoutDetails);

    this.dozerApiService.quickSell(checkoutDetails).subscribe(
      data => {
        this.dozerApiService.printTakeAway(checkoutDetails).subscribe(data1 => {
        });
      },
      error1 => {
        // this.alert_service.error(
        //   'An Error Occurred' ,
        //   error1.message
        // );
      });


    this.dialogRef.close('done');
  }



}

// LargeEntryPopup
@Component({
  selector: 'app-large-entry',
  templateUrl: 'large-entry-component.html',
})
export class LargeEntryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private dozerApiService: DozerApiService ,
    private dataHolderService: DataHolderService ,
    private alertService: NotificationsService) {}

  amount = 0;
  shotsCount = 0;
  isShooter = 0;

  ngOnInit(): void {
   this.isShooter = +this.data.isShooter;
   this.shotsCount = +this.data.shotCount;
   console.log(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close('cancel');
  }

  fullBottleAmount() {
    this.amount = this.data.shotCount;
  }
  confirmOrder() {
    this.dataHolderService.storeNewLargeEntryAmount(this.amount);
    this.dialogRef.close('done');
  }





}



