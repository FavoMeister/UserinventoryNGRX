import { createAction, props } from "@ngrx/store";
import { Customer } from "../../models/customer.model";

export const loadCustomers = createAction('[Customer] Load Customers');

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ payload: Customer[] }>()
);

export const loadCustomersFail = createAction(
  '[Customer] Load Customers Fail',
  props<{ payload: any }>()
);

// Update Cutomer
export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ payload: Customer }>()
);

export const updateCustomerSuccess = createAction(
  '[Customer] Update Customer Success',
  props<{ payload: Customer }>()
); 

export const updateCustomerFail = createAction(
  '[Customer] Update Customer Fail',
  props<{ payload: any }>()
);

// Add Customer
export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ payload: Customer }>()
);

// Success Action for Add Customer
export const addCustomerSuccess = createAction(
  '[Customer] Add Customer Success',
  props<{ payload: Customer }>()
);

// Fail Action for Add Customer
export const addCustomerFail = createAction(
  '[Customer] Add Customer Fail',
  props<{ payload: any }>()
);

// Delete Customer
export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ id: number }>()
);

export const deleteCustomerSuccess = createAction(
  '[Customer] Delete Customer Success',
  props<{ id: number }>()
);

export const deleteCustomerFail = createAction(
  '[Customer] Delete Customer Fail',
  props<{ payload: any }>()
);