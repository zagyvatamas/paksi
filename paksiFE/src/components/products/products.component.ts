import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Products } from '../../interfaces/products';

@Component({
  selector: 'app-products',
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  searchTerm: string = '';
  products:Products[] = [];
  filters = [];

  constructor(private productService: ProductService) {}

  ngOnInit(){
    this.productService.getProducts()
    .subscribe({
      next:(data) => {
        this.products = data
        console.log(this.products);
        
      },
      error: (err) => {
        console.error('Hiba történt a lekérés során:', err);
      }
    })
  }


  get filteredProducts() {
    return this.products.filter(p => 
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
