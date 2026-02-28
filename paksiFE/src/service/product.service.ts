import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(dataArray => 
        dataArray.map(item => new Products(item.id, item.name, item.handle, item.retailPrice, item.wholesalePrice, item.imageUrl, item.available, item.discountPercent, item.storageType, item.category))
      )
    );
  }
}
