import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>('http://localhost:3001/usuarios');
  }

}
