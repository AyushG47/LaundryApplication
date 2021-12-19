import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }


  addCustomer(cust: Customer): Observable<Customer> {

    return this.http.post<Customer>("http://localhost:1643/customer/add", cust);
  }

  updateCustomer(cust: Customer): Observable<Customer> {
    return this.http.put<Customer>(`http://localhost:1643/customer/update/${cust.userId}`, cust);
  }

  removeCustomer(userId: number): Observable<Customer> {
    return this.http.delete<Customer>(`http://localhost:1643/customer/delete/${userId}`);

  }

  getCustomer(userId: number): Observable<Customer> {
    return this.http.get<Customer>(`http://localhost:1643/customer/get/${userId}`);

  }


 getAllCustomers(): Observable<Customer[]> {
    
    return this.http.get<Customer[]>("http://localhost:1643/customer/all");
  }
}
