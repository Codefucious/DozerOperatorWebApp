import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';



@Injectable({
  providedIn: 'root'
})
export class DataHolderService {

  private batchList: BehaviorSubject<any>  = new BehaviorSubject({});
  storedBatchList = this.batchList.asObservable();

  private productsList: BehaviorSubject<any>  = new BehaviorSubject({});
  storedProductsList = this.productsList.asObservable();

  private batchDetails: BehaviorSubject<any>  = new BehaviorSubject({});
  storedBatchDetails = this.batchDetails.asObservable();

  private serviceDetails: BehaviorSubject<any>  = new BehaviorSubject({});
  storedServiceDetails = this.serviceDetails.asObservable();

  private bincard: BehaviorSubject<any>  = new BehaviorSubject({});
  storedBincard = this.bincard.asObservable();

  private allForSale: BehaviorSubject<any>  = new BehaviorSubject({});
  storedAllForSale = this.allForSale.asObservable();

  private tableBill: BehaviorSubject<any>  = new BehaviorSubject({});
  storedTableBill = this.tableBill.asObservable();

  private tableNumber: BehaviorSubject<any>  = new BehaviorSubject({});
  storedTableNumber = this.tableNumber.asObservable();

  private serviceNumber: BehaviorSubject<any>  = new BehaviorSubject({});
  storedServiceNumber = this.serviceNumber.asObservable();

  public timeRange: BehaviorSubject<any>  = new BehaviorSubject({});
  storedTimeRange = this.timeRange.asObservable();

  private viewerData: BehaviorSubject<any>  = new BehaviorSubject({});
  storedViewerData = this.viewerData.asObservable();


  private viewerTitle: BehaviorSubject<any>  = new BehaviorSubject({});
  storedViewerTitle = this.viewerTitle.asObservable();


  private hidePosButton: BehaviorSubject<any>  = new BehaviorSubject({});
  storedHidePosButton = this.hidePosButton.asObservable();

  private largeEntryAmount: BehaviorSubject<any>  = new BehaviorSubject({});
  storedLargeEntryAmount = this.largeEntryAmount.asObservable();

  private userInfo: BehaviorSubject<any>  = new BehaviorSubject({});
  storedUserInfo = this.userInfo.asObservable();

  constructor( private datePipe: DatePipe) { registerLocaleData(localeEn, 'en-US');
  }

  storeNewUserInfo(userInfo: any) {
    this.userInfo.next(userInfo);
  }

  storeNewProductBatchList(batchlist: any) {
    this.batchList.next(batchlist);
  }

  storeNewProductList(productlist: any) {
    console.log(productlist);
    this.productsList.next(productlist);
  }

  storeNewBatchDetails(batchdetails: any) {
    console.log(batchdetails);
    this.batchDetails.next(batchdetails);
  }

  storeNewServiceDetails(servicedetails: any) {
    console.log(servicedetails);
    this.serviceDetails.next(servicedetails);
  }

  storeNewBincard(bincard: any) {
    console.log(bincard);
    this.bincard.next(bincard);
  }

  storeNewAllForSale(products: any) {
    console.log(products);
    this.allForSale.next(products);
  }

  storeNewTableBill(bill: any) {
    console.log(bill);
    this.tableBill.next(bill);
  }

  storeNewTableNumber(numb) {
    console.log(numb);
    this.tableNumber.next(numb);
  }

  storeNewLargeEntryAmount(numb) {
    console.log(numb);
    this.largeEntryAmount.next(numb);
  }

  storeNewTimeRange(range) {
    console.log(range);
    this.timeRange.next(range);
  }

  storeNewViewerData(data) {
    console.log(data);
    this.viewerData.next(data);
  }

  storeNewViewerTitle(title) {
    console.log(title);
    this.viewerTitle.next(title);
  }

  storeNewHidePosButton(flag) {
    console.log(flag);
    this.hidePosButton.next(flag);
  }


  get_today_range() {
    const dateString = new Date().getTime() + '';
    const fromTimestamp = Date.parse(this.datePipe.transform(dateString, 'd MMM y 00:00:00 OOO'));
    const t_Timestamp = Date.parse(this.datePipe.transform(dateString, 'd MMM y 23:59:59 OOO'));
    return { from: fromTimestamp , to: t_Timestamp };
  }



}

