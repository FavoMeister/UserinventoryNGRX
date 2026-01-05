import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer as CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<CustomerModel[]>('http://localhost:3001/usuarios');
  }
}
