import { ActionReducerMap } from '@ngrx/store';
import * as fromCustomerReducer from './app.reducer';

// Define the overall state interface
export interface AppState {
    customers: fromCustomerReducer.CustomerState;
}

//
export const reducers: ActionReducerMap<AppState> = {
    // Aquí usamos 'customerReducer' porque así lo nombramos en el paso anterior
    customers: fromCustomerReducer.customerReducer 
};