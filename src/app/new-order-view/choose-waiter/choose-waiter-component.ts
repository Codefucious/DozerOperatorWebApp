// LargeEntryPopup
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderDetailsComponent} from '../new-order-view.component';
import {DozerApiService} from '../../dozer-api.service';
import {DataHolderService} from '../../data-holder.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-choose-waiter',
  templateUrl: 'choose-waiter-component.html',
})
export class ChooseWaiterComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private dozerApiService: DozerApiService ,
    private dataHolderService: DataHolderService ,
    private alertService: NotificationsService) {}


  waiters: any = [];
  ngOnInit(): void {
    this.dozerApiService.getWaitersList()
      .subscribe( data => {
        this.waiters = data;
      });
  }

  selectWaiter(id , name ): void {
    this.dialogRef.close({id , name});
  }






}
