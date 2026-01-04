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
    data: [
        { id: 1, name: 'John Doe', age: 30, email: 'jdoe@gmail.com'}
    ],
    loaded: false,
    loading: false,
    error: ''
};

// Reducer function to handle actions and update the state
export function reducer(state = initialState,  action: { type: any; }){
    switch (action.type) {
        case fromCustomerActions.LOAD_CUSTOMERS: {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state;
    }
}