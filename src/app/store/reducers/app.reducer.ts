import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import * as fromCustomerActions from '../actions/customer.action';

// Define the state interface for Customer feature
export interface CustomerState {
    data: Customer[]; // To have the User list
    loaded: boolean; // To know if data is loaded
    loading: boolean; // To know if data is loading
    error: string; // To store error message
}

// Initial state for the Customer feature
export const initialState: CustomerState = {
    data: [],
    loaded: false,
    loading: false,
    error: ''
};

// Reducer function to handle actions and update the state
export const customerReducer = createReducer(
    initialState,
    
    // Maneja LOAD_CUSTOMERS
    on(fromCustomerActions.loadCustomers, (state) => ({
        ...state,
        loading: true
    })),

    // Maneja LOAD_CUSTOMERS_SUCCESS (desestructuramos payload)
    on(fromCustomerActions.loadCustomersSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        data: payload
    })),

    // Maneja LOAD_CUSTOMERS_FAIL
    on(fromCustomerActions.loadCustomersFail, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);