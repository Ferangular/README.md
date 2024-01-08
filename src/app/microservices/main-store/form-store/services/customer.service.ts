import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Customer} from "../interfaces/customer";
import {firstValueFrom, from, map, Observable} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";

interface CustomerResponse {
  data: Customer[];
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {

    constructor(private http: HttpClient) { }


    async getCustomersSmall() {
      const data = await firstValueFrom(this.http.get<Customer[]>('assets/demo/data/customers-small.json'))
      return data;
    }

    getCustomers():Observable<Customer[]> {
         return from(this.http.get<CustomerResponse[]>('assets/demo/data/customers-small.json')).pipe(
           // @ts-ignore
        map(response=>response.data)
      );
    }
    getCustomersJSON() {
    return ajax.getJSON('assets/demo/data/customers-small.json',{
        'Content-Type': 'application/json',
          'mi-token': 'ABC123'
      });
  }
    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }
}
