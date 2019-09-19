import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../Auth/authentication-service.service';
import {DataHolderService} from '../data-holder.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  userInfo: any = {};

  constructor( private authenticationService: AuthenticationService ,
               private dataHolderService: DataHolderService) { }


  ngOnInit() {
    this.authenticationService.getUserInfo();
    this.dataHolderService.storedUserInfo.subscribe(info => {
      console.log(info);
      this.userInfo = info;
    });
  }

}
