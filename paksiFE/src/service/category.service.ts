import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(dataArray => 
        dataArray.map(item => new Category(item.id, item.name, item.imageUrl))
      )
    );
  }
}
