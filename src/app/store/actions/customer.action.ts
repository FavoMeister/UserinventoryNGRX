import { Action } from "@ngrx/store";

export const LOAD_CUSTOMERS = '[Customer] Load Customers';

// Action class to use the constant
export class LoadCustomer implements Action {
  readonly type = LOAD_CUSTOMERS;
}

// To have a reference to classes
export type CustomerActions = LoadCustomer;