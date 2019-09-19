import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/retry';

const API_URL = 'http://localhost/DozerAPI/public';
// const API_URL = 'https://dozer-tz.com';

export interface CoreProduct {
  name: string;
  quantity: number;
  metric: string;
}


@Injectable({
  providedIn: 'root'
})
export class DozerApiService {

  constructor(private httpClient: HttpClient) { }

  getProductsAndServices() {
    return this.httpClient.get(API_URL + '/index.php/api/get_products_and_services' ).retry(3);
  }
  getIngredients() {
    return this.httpClient.get(API_URL + '/index.php/api/get_ingredients' ).retry(3);
  }
  getProductBatches(id) {
    return this.httpClient.post(API_URL + '/index.php/api/get_products_batches' , {prod_id: id} ).retry(3);
  }
  addNewProduct(product: CoreProduct) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/add_new_product' ,
      product
    ).retry(3);
  }


  getTableBill(table_number) {
    return this.httpClient.post(API_URL + '/index.php/api/get_table_bill' , {table_number} ).retry(3);
  }


  getBatchDetails(id) {
    return this.httpClient.post(API_URL + '/index.php/api/get_batch_details' , {batch_id: id } ).retry(3);
  }
  getServiceDetails(id) {
    return this.httpClient.post(API_URL + '/index.php/api/get_service_details' , {service_number: id } ).retry(3);
  }
  getBatchBincard(id) {
    return this.httpClient.post(API_URL + '/index.php/api/get_batch_bincard' , {batch_id: id } ).retry(3);
  }
  getAllForSale() {
    return this.httpClient.get(API_URL + '/index.php/api/get_all_for_sale' ).retry(3);
  }

  getBilledTables() {
    return this.httpClient.get<any>(API_URL + '/index.php/api/get_billed_tables' ).retry(3);
  }
  getTables(id) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/get_tables' , {id}).retry(3);
  }

  getIngredientsStockLevels() {
    return this.httpClient.get<any>(API_URL + '/index.php/api/get_ingredients_stock_levels' ).retry(3);
  }

  getPendingOrders() {
    return this.httpClient.get<any>(API_URL + '/index.php/api/get_pending_orders' ).retry(3);
  }


  printTicket( checkoutDetails ) {
    return this.httpClient.post<any>('http://localhost/DozerRecieptPrinter/index.php' ,
      {type: 'ticket' , order_details: checkoutDetails}  ).retry(3);
  }

  deletePendingOrder( id ) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/delete_pending_order',
      { id}  ).retry(3);
  }
  printBill( bill, table_number ) {
    return this.httpClient.post<any>('http://localhost/DozerRecieptPrinter/index.php' ,
      {type: 'bill' , bill , table_number}  ).retry(3);
  }

  addToTableBill(table_number , bill) {
    console.log(table_number);
    return this.httpClient.post(API_URL + '/index.php/api/add_to_table_bill' , {table_number , bill} ).retry(3);
  }
  addToTablePending(order) {
    return this.httpClient.post(API_URL + '/index.php/api/add_to_pending_orders' , order ).retry(3);
  }


  printTakeAway( checkoutDetails ) {
    return this.httpClient.post<any>('http://localhost/DozerRecieptPrinter/index.php' ,
      {type: 'take_away' , order_details: checkoutDetails }  ).retry(3);
  }


  saveNewTable(tableNum , tableName) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/save_new_table',
      { table_num : tableNum , table_name : tableName}  ).retry(3);
  }


  getTodayKitchenOrders( range) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/get_kitchen_orders_today',
      range  ).retry(3);
  }

  updateTable(tableNum , tableName) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/update_table',
      { table_num : tableNum , table_name : tableName }  ).retry(3);
  }

  saveNewKitchenExpense(expense) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/save_new_kitchen_expense' ,
      expense
    );
  }

  getKitchenExpensesHistory() {
    return this.httpClient.get(API_URL + '/index.php/api/get_kitchen_expenses_history' ).retry(3);
  }

  getTodayKitchenExpenses(range) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/get_kitchen_expenses_today',
      range  ).retry(3);
  }

  getDrinksStockLevels() {
    return this.httpClient.get<any>(API_URL + '/index.php/api/get_drinks_stock_levels' ).retry(3);
  }

  getTodayBarOrders(range) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/get_bar_orders_today',
      range  ).retry(3);
  }

  getTodayBarExpenses(range) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/get_bar_expenses_today',
      range  ).retry(3);
  }

  getBarExpensesHistory() {
    return this.httpClient.get(API_URL + '/index.php/api/get_bar_expenses_history' ).retry(3);
  }

  saveNewBarExpense(expense) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/save_new_bar_expense' ,
      expense
    ).retry(3);
  }

  requestProductRefill(id) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/request_product_refill' ,
      {id}
    ).retry(3);
  }

  requestIngredientRefill(id) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/request_ingredient_refill' ,
      {id}
    ).retry(3);
  }

  clearTableBill(table_number: any, time: any) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/clear_bill' ,
      {table_number , date : time }  ).retry(3);
  }

  getStockSheet(time: any) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/get_stock_sheet' ,
      { time }  ).retry(3);
  }

  quickSell(paymentDetails: any) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/quick_sell' ,
      paymentDetails
    );
  }


  // AUTH REQUESTS

  logIn(num , pass ) {
    return this.httpClient.post<any>(API_URL + '/index.php/api/auth/login' ,
      {
        phone_number: num ,
        password: pass,
      }
    );
  }

  getWaitersList() {
    return this.httpClient.get<any>(API_URL + '/index.php/api/get_waiters_list' ).retry(3);
  }

  transferBill(table_id, id, name) {

    return this.httpClient.post<any>(API_URL + '/index.php/api/transfer_bill' ,
      {id , table_id , name }
    ).retry(3);

  }
}
