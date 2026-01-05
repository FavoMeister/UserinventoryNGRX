import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from '../reducers/app.reducer';

// 1. Obtenemos la "rebanada" completa del estado de clientes
export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

// 2. Selector específico para la lista de data
export const selectAllCustomers = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.data
);

// 3. Selector para el estado de carga
export const selectCustomersLoaded = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.loaded
);

// 4. Selector para el estado de loading
export const selectCustomersLoading = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.loading
);

// 5. Selector para el error
export const selectCustomersError = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.error
);

/* export const getCustomerById = (id: any) => createSelector(
    selectAllCustomers,
    (customers) => {
        console.log('Buscando ID:', id, 'Tipo:', typeof id);
        console.log('Primer cliente en Store:', customers[0]?.id, 'Tipo:', typeof customers[0]?.id);
        
        // Intentamos una comparación más flexible (==) para debuguear
        return customers.find(customer => customer.id == id); 
    }
); */
export const getCustomerById = (id: string | number) => createSelector(
    selectAllCustomers,
    (customers) => {
        // Convertimos ambos a String para asegurar la comparación
        return customers.find(customer => String(customer.id) === String(id));
    }
);