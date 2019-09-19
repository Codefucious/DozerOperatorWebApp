import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatBadgeModule,
  MatDialog,
  MatDialogModule, MatFormFieldModule,
  MatIcon, MatInputModule,
  MatLabel,
  MatListModule, MatOptionModule, MatSelectModule, MatSnackBar, MatSnackBarModule,
  MatStepperModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import {
  LargeEntryComponent,
  NewOrderViewComponent,
  OrderDetailsComponent
} from './new-order-view/new-order-view.component';
import { PendingOrderViewComponent } from './pending-order-view/pending-order-view.component';
import { TableBillsViewComponent } from './table-bills-view/table-bills-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule, DatePipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {NgQrScannerModule} from 'angular2-qrscanner';
import { CameraComponent } from './camera/camera.component';
import { WaiterSelectorComponent } from './waiter-selector/waiter-selector.component';
import { ManageTablesComponent } from './manage-tables/manage-tables.component';
import {FormsModule} from '@angular/forms';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { CounterPrinterComponent } from './counter-printer/counter-printer.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { BarComponent } from './bar/bar.component';
import { RequestBarStockComponent } from './bar/request-bar-stock/request-bar-stock.component';
import { RecordBarExpenseComponent } from './bar/record-bar-expense/record-bar-expense.component';
import { RecordKitchenExpenseComponent } from './kitchen/record-kitchen-expense/record-kitchen-expense.component';
import { RequestKitchenStockComponent } from './kitchen/request-kitchen-stock/request-kitchen-stock.component';
import { WaiterComponent } from './waiter/waiter.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {LongPressModule} from 'ngx-long-press/dist/src';
import { StockSheetTodayComponent } from './bar/stock-sheet-today/stock-sheet-today.component';
import { ViewStocksheetProductSalesComponent } from './bar/stock-sheet-today/view-stocksheet-product-sales/view-stocksheet-product-sales.component';
import { LogInComponent } from './log-in/log-in.component';
import {TokenInterceptor} from './Auth/token-interceptor';
import { UnapprovedViewComponent } from './navigation-menu/unapproved-view/unapproved-view.component';
import {ChooseWaiterComponent} from './new-order-view/choose-waiter/choose-waiter-component';

@NgModule({
  declarations: [
    AppComponent,
    NewOrderViewComponent,
    PendingOrderViewComponent,
    TableBillsViewComponent,
    CameraComponent,
    OrderDetailsComponent,
    WaiterSelectorComponent,
    ManageTablesComponent,
    CounterPrinterComponent,
    NavigationMenuComponent,
    KitchenComponent,
    BarComponent,
    RequestBarStockComponent,
    RecordBarExpenseComponent,
    RecordKitchenExpenseComponent,
    RequestKitchenStockComponent,
    LargeEntryComponent,
    WaiterComponent,
    StockSheetTodayComponent,
    ViewStocksheetProductSalesComponent,
    LogInComponent,
    UnapprovedViewComponent,
    ChooseWaiterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule ,
    NgHttpLoaderModule.forRoot(),
    MatTabsModule,
    MatCardModule,
    MatStepperModule,
    MatListModule,
    ZXingScannerModule,
    NgQrScannerModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    FlexLayoutModule,
    MatIconModule,
    LongPressModule,
    MatDialogModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    SimpleNotificationsModule.forRoot(),
    NgxGaugeModule
  ],
  entryComponents: [
    CameraComponent ,
    OrderDetailsComponent ,
    WaiterSelectorComponent ,
    RequestBarStockComponent ,
    RecordBarExpenseComponent ,
    RecordKitchenExpenseComponent ,
    RequestKitchenStockComponent,
    LargeEntryComponent,
    ViewStocksheetProductSalesComponent,
    ChooseWaiterComponent
],
  providers: [ DatePipe ,
    { provide: HTTP_INTERCEPTORS ,
      useClass: TokenInterceptor ,
      multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
