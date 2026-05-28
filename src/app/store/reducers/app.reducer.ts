import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Customer } from '../../models/customer.model';
import * as fromCustomerActions from '../actions/customer.action';

// Define the state interface for Customer feature
export interface CustomerState extends EntityState<Customer>{
    ids: number[],
    entities: any,
    //data: Customer[]; // To have the User list
    loaded: boolean; // To know if data is loaded
    loading: boolean; // To know if data is loading
    error: string; // To store error message
}

// 2. Creamos el adaptador. Por defecto busca una propiedad llamada 'id'.
// Si tus clientes usan otra propiedad como llave primaria (ej. 'customerId'), 
// tendrías que configurarlo como: createEntityAdapter<Customer>({ selectId: c => c.customerId })
export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer : CustomerState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    error: ''
}

// Initial state for the Customer feature
export const initialState: CustomerState = customerAdapter.getInitialState(defaultCustomer);

// Initial state for the Customer feature
/* export const initialState: CustomerState = customerAdapter.getInitialState({
    data: [],
    loaded: false,
    loading: false,
    error: ''
}); */

// Reducer function to handle actions and update the state
export const customerReducer = createReducer(
    initialState,
    
    // Maneja LOAD_CUSTOMERS
    on(fromCustomerActions.loadCustomers, (state) => ({
        ...state,
        loading: true
    })),

    // Maneja LOAD_CUSTOMERS_SUCCESS (desestructuramos payload)
    on(fromCustomerActions.loadCustomersSuccess, (state, { payload }) => 
        customerAdapter.setAll(payload, { ...state, loading: false, loaded: true })
    ),

    // Maneja LOAD_CUSTOMERS_FAIL
    on(fromCustomerActions.loadCustomersFail, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),

    // updateOne se encarga de buscar y actualizar inmutablemente cunado el id en el modelo es obligatorio
    /* on(fromCustomerActions.updateCustomerSuccess, (state, { payload }) => 
        customerAdapter.updateOne({ id: payload.id, changes: payload }, state)
    ), */

    // Maneja UPDATE_CUSTOMER_SUCCESS
    on(fromCustomerActions.updateCustomerSuccess, (state, { payload }) => {
    if (payload.id === undefined) return state; // Salvaguarda por si acaso
        return customerAdapter.updateOne({ id: payload.id, changes: payload }, state);
    }),

    // Maneja ADD_CUSTOMER_SUCCESS
    on(fromCustomerActions.addCustomerSuccess, (state, { payload }) => 
        customerAdapter.addOne(payload, { ...state, loading: false, loaded: true })
    ),

    // Maneja DELETE_CUSTOMER_SUCCESS
    on(fromCustomerActions.deleteCustomerSuccess, (state, { id }) => 
        customerAdapter.removeOne(id, state)
    ),
);