import { Component, OnInit, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store'; // Import Store from NgRx
import * as fromStore from './store'; // Import the AppState interface
import * as fromCustomerActions from './store/actions/customer.action';
import { Customer } from './models/customer.model';
import { CustomerService } from './services/customer-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'crud-app';
  //customers = signal<Customer[]>([]);
  private store = inject(Store);
  display = signal<'block' | 'none'>('none');
  isEditModeEnabled = signal<boolean>(false);
  person: Customer = {
    email: ''
  };

  // Example of injecting the store
  constructor(private customerService: CustomerService) {
    /* store.select(state => state.customers).subscribe(customersState => {
      console.log('Customers State:', customersState);
      this.customers = customersState.data;
    }); */
    /* customesrService.getCustomers().subscribe((data) => {
      this.customers = data;
      console.log('Fetched Customers:', this.customers);
    }); */
  }

  customers = toSignal(this.store.select(fromStore.selectAllCustomers), { initialValue: [] });

  isLoading = toSignal(this.store.select(fromStore.selectCustomersLoading), { initialValue: false });

  isLoaded = toSignal(this.store.select(fromStore.selectCustomersLoaded), { initialValue: false });

  errorMessage = toSignal(this.store.select(fromStore.selectCustomersError), { initialValue: null });

  customer30 = toSignal(this.store.select(fromStore.getCustomerById(1)));

  ngOnInit() {
    // 1. Disparamos la acción para cargar datos
    this.store.dispatch(fromCustomerActions.loadCustomers());

    /* this.store.select(fromStore.getCustomerById(1)).subscribe(customer => {
      console.log('Customer with ID 1:', customer);
    }); */
    /* this.store.select(fromStore.getCustomerById(1)).subscribe(data => {
      console.log('Datos recibidos desde el Store para ID 1:', data);
    }); */

    // Debug: Ver el estado completo de customers
    /* this.store.select(state => state.customers).subscribe(state => {
      console.log('Estado completo de customers:', state);
    }); */
    // 2. Nos suscribimos al store para actualizar la signal
    // (En el futuro usaremos Selectors para esto, pero así funciona perfecto por ahora)
    /*this.store.select(state => state.customers.data).subscribe(data => {
        if (data) {
            this.customers.set(data);
        }
    });*/
    /* this.customerService.getCustomers().subscribe((data) => {
      console.log('Fetched Customers:', data);
      // 3. Usamos .set() para actualizar el valor. 
      // Esto obligará a la tabla a renderizarse.
      this.customers.set(data); 
    }); */
  }

  openModalDialog() {
    this.isEditModeEnabled.set(false);
    this.display.set('block');
  }

  openModal() {
    this.display.set('block');
  }

  closeModal(form: any) {
    this.display.set('none');
    form.reset();
  }
  
  // Cuando vas a editar
  editCustomer(customer: Customer) {
    this.isEditModeEnabled.set(true);
    this.person = { ...customer }; // Clona el objeto para evitar mutaciones directas
    this.display.set('block');

    // ... lógica para cargar datos en el form
  }

  updateCustomer(form: any) {
    if (form.valid) {
    // IMPORTANTE: Enviar el objeto con la propiedad 'payload'
    this.store.dispatch(fromStore.updateCustomer({ payload: form.value }));
    
    this.closeModal(form);
  } else {
    console.error('Form is invalid');
  }
  }

  addCustomer(form: any) {
    if (form.valid) {
      // Eliminamos el ID si está vacío para que la base de datos cree uno nuevo
      const { id, ...newCustomerData } = form.value;
      
      this.store.dispatch(fromStore.addCustomer({ payload: newCustomerData }));
      
      this.closeModal(form);
    } else {
      console.error('Formulario no válido');
    }
  }

  removeCustomer(id: string | number) {
    if(id !== undefined){
      if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        this.store.dispatch(fromStore.deleteCustomer({ id }));
      }
    }
    
  }
  deleteCustomer(id: string | number) {
    // Lógica para eliminar cliente (a implementar)
    console.log('Eliminar cliente con ID:', id);
  }
}
