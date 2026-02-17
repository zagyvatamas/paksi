import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Discount } from '../interfaces/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private apiUrl = 'http://localhost:3000/api/discount';

  constructor(private http: HttpClient) { }

  getDiscount(): Observable<Discount[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(dataArray => 
        dataArray.map(item => new Discount(item.id, item.name, item.imageUrl, item.discountPercent))
      )
    );
  }
}
