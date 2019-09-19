import { Component, OnInit } from '@angular/core';
import {DozerApiService} from '../dozer-api.service';
import {DataHolderService} from '../data-holder.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.css']
})
export class ManageTablesComponent implements OnInit {
  tableNumber: number;
  tableName = '';
  tables = [];

  constructor(private dozerApiService: DozerApiService ,
              private dataHolderService: DataHolderService ,
              private alertService: NotificationsService ,
              private _route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.tableNumber = this._route.snapshot.paramMap.get('table_number') as unknown as number;
    this.dataHolderService.storeNewHidePosButton(true);

    // this.dozerApiService.getTables().subscribe( data => {
    //   this.tables = data;
    // });


  }

  saveNewTable() {
    this.dozerApiService.saveNewTable(this.tableNumber , this.tableName).subscribe(data => {
      this.alertService.success(
        'New Table ' + this.tableName  ,
        'Added Successfully'
      );
      this.router.navigate(['']);
    });
  }

  updateTable(tableName) {
    this.dozerApiService.updateTable(this.tableNumber , tableName).subscribe(data => {
      this.alertService.success(
        'Table ' + tableName  ,
        'Updated Successfully'
      );
      this.router.navigate(['']);
    });
  }
}
