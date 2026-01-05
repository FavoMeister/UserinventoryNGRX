import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
}