import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store'; // Import Store from NgRx
import * as fromStore from './store'; // Import the AppState interface
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'crud-app';
  customers: Customer[] | undefined;

  // Example of injecting the store
  constructor(private store: Store<fromStore.AppState>) {
    store.select(state => state.customers).subscribe(customersState => {
      console.log('Customers State:', customersState);
      this.customers = customersState.data;
    });
   }
}
