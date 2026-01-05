export * from './reducers';
export * from './actions';
export * from './effects';

export * from './selectors/customer.selector'; 

import { ActionReducerMap } from '@ngrx/store';
import * as fromCustomerReducer from './reducers/app.reducer';

export interface AppState {
    customers: fromCustomerReducer.CustomerState;
}

export const reducers: ActionReducerMap<AppState> = {
    customers: fromCustomerReducer.customerReducer 
};