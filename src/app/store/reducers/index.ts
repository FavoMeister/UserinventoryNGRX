import * as fromCustoemrReducer from './app.ruducer';

// Define the overall state interface
export interface AppState {
    customers: fromCustoemrReducer.CustomerState;
}

// Combine the reducers
export const reducers = {
    customers: fromCustoemrReducer.reducer
};