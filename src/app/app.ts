import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store'; // Import Store from NgRx
import * as fromStore from './store'; // Import the AppState interface
import * as fromCustomerActions from './store/actions/customer.action';
import { Customer } from './models/customer.model';
import { CustomerService } from './services/customer-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'crud-app';
  customers = signal<Customer[]>([]);

  // Example of injecting the store
  constructor(private store: Store<fromStore.AppState>, private customerService: CustomerService) {
    /* store.select(state => state.customers).subscribe(customersState => {
      console.log('Customers State:', customersState);
      this.customers = customersState.data;
    }); */
    /* customesrService.getCustomers().subscribe((data) => {
      this.customers = data;
      console.log('Fetched Customers:', this.customers);
    }); */
  }
  ngOnInit() {
    // 1. Disparamos la acción para cargar datos
    this.store.dispatch(fromCustomerActions.loadCustomers());

    // 2. Nos suscribimos al store para actualizar la signal
    // (En el futuro usaremos Selectors para esto, pero así funciona perfecto por ahora)
    this.store.select(state => state.customers.data).subscribe(data => {
        if (data) {
            this.customers.set(data);
        }
    });
    /* this.customerService.getCustomers().subscribe((data) => {
      console.log('Fetched Customers:', data);
      // 3. Usamos .set() para actualizar el valor. 
      // Esto obligará a la tabla a renderizarse.
      this.customers.set(data); 
    }); */
  }
}
