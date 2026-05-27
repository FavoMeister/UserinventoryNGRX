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
    })),

    // Maneja UPDATE_CUSTOMER_SUCCESS
    on(fromCustomerActions.updateCustomerSuccess, (state, { payload }) => ({
        ...state, // spread operator para mantener el estado anterior
        // Actualizamos el cliente en la lista
        data: state.data.map(customer =>
            // Usamos String() para que '1' === 1 sea true
            String(customer.id) === String(payload.id) ? payload : customer
        )
    })),

    // Maneja ADD_CUSTOMER_SUCCESS
    on(fromCustomerActions.addCustomerSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        // Creamos un nuevo array con los datos actuales + el nuevo cliente
        data: [...state.data, payload] 
    })),

    // Maneja DELETE_CUSTOMER_SUCCESS
    on(fromCustomerActions.deleteCustomerSuccess, (state, { id }) => ({
        ...state,
        // Filtramos la lista para quitar el ID borrado
        // Usamos String() por si acaso hay mezcla de tipos string/number
        data: state.data.filter(customer => String(customer.id) !== String(id))
    })),
);