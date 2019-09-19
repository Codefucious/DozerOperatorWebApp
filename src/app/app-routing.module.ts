import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {WaiterSelectorComponent} from './waiter-selector/waiter-selector.component';
import {ManageTablesComponent} from './manage-tables/manage-tables.component';
import {CounterPrinterComponent} from './counter-printer/counter-printer.component';
import {NavigationMenuComponent} from './navigation-menu/navigation-menu.component';
import {KitchenComponent} from './kitchen/kitchen.component';
import {BarComponent} from './bar/bar.component';
import {WaiterComponent} from './waiter/waiter.component';
import {LogInComponent} from './log-in/log-in.component';


const routes: Routes = [
  { path: 'waiter' ,
    component: WaiterSelectorComponent
  },
  { path: 'tables' ,
    component: ManageTablesComponent
  },
  { path: 'counter' ,
    component: CounterPrinterComponent
  },
  { path: 'kitchen' ,
    component: KitchenComponent
  } ,
  { path: 'bar' ,
    component: BarComponent
  }  ,
  { path: 'waiter_app' ,
    component: WaiterComponent
  },
  { path: '' ,
    component: LogInComponent
  },
  { path: 'menu' ,
    component: NavigationMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
