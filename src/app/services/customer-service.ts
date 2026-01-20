import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private apiUrl = 'http://localhost:3001/usuarios'; // Base URL for the API
  // HTTP Options
  public httpOpt = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain'
    })
  };

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(this.apiUrl); // Fetch all customers
  }

  // Update Customer
  updateCustomer(customer: Customer) {
    const url = `${this.apiUrl}/${customer.id}`;
    return this.http.put<Customer>(url, JSON.stringify(customer), this.httpOpt);
  }
}
