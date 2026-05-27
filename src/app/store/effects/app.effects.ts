import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromCustomersActions from '../actions/customer.action';
import { CustomerService } from '../../services/customer-service';
//import all requried services or any dependencies

@Injectable()
export class CustomerEffects {
    //constructor(private actions$: Actions, private customerService: CustomerService) { }

    private actions$ = inject(Actions);
    private customerService = inject(CustomerService);

    loadCustomers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromCustomersActions.loadCustomers),
      switchMap(() => 
        this.customerService.getCustomers().pipe(
          map(customers => fromCustomersActions.loadCustomersSuccess({ payload: customers })), // Pasamos el objeto con payload,
          // Importante: catchError debe devolver un observable, por eso usamos of()
          catchError(error => of(fromCustomersActions.loadCustomersFail({ payload: error })))
        )
      )
    )
  );

  //Update Customer
  //@Effect()
  updateCustomer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromCustomersActions.updateCustomer),
      switchMap(action => 
        // Llamamos al servicio para actualizar el cliente
        this.customerService.updateCustomer(action.payload).pipe(
          // Si la actualización es exitosa, despachamos la acción de éxito
          map(updatedCustomer => fromCustomersActions.updateCustomerSuccess({ payload: updatedCustomer })), // Pasamos el objeto con payload,
          // Importante: catchError debe devolver un observable, por eso usamos of()
          catchError(error => of(fromCustomersActions.updateCustomerFail({ payload: error })))
        )
      )
    )
  );

  //Add Customer
  addCustomer$ = createEffect(() => 
    // Escuchamos las acciones
    this.actions$.pipe(
      // Filtramos por la acción de agregar cliente
      ofType(fromCustomersActions.addCustomer),
      switchMap(action => 
        // Llamamos al servicio para agregar el cliente
        this.customerService.addCustomer(action.payload).pipe(
          // Si la adición es exitosa, despachamos la acción de éxito
          map(newCustomer => fromCustomersActions.addCustomerSuccess({ payload: newCustomer })),
          // Importante: catchError debe devolver un observable, por eso usamos of()
          catchError(error => of(fromCustomersActions.addCustomerFail({ payload: error })))
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromCustomersActions.deleteCustomer),
      // Usamos mergeMap porque no importa el orden si borramos varios seguidos
      mergeMap(action => 
        this.customerService.deleteCustomer(action.id).pipe(
          map(() => fromCustomersActions.deleteCustomerSuccess({ id: action.id })),
          catchError(error => of(fromCustomersActions.deleteCustomerFail({ payload: error })))
        )
      )
    )
  );
}