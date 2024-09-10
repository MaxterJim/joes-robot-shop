import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './catalog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { } //No olvidar agregar HttpClientModule alos import de appModule

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>('/api/products');
  }
}
