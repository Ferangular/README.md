import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Product} from "../interfaces/product";
import {from, map, Observable, tap} from "rxjs";


interface ProductResponse {
  data: Product[];
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products$: Observable<Product[]>;
    constructor(private http: HttpClient) {
      this.products$ = this.http.get<Product[]>('assets/demo/data/products.json').pipe(
        tap(response => console.log(response))
      );
    }


  getProducts():Observable<Product[]> {
    return from(this.http.get<ProductResponse[]>('assets/demo/data/products.json')).pipe(
      tap(response => console.log(response)),
      // @ts-ignore
      map(response=>response.data )
    );
  }


  getProductById(productId: string): Observable<Product | undefined> {
    return this.products$.pipe(
      map(products => products.find(product => product.id === productId))
    );
  }
}
