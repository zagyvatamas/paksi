import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  // Alapadatok
  products = [
    { name: 'iPhone 15', category: 'Elektronika' },
    { name: 'Kenyér', category: 'Élelmiszer' },
    { name: 'Monitor', category: 'Elektronika' },
    { name: 'Alma', category: 'Élelmiszer' },
  ];

  // Filter állapotok
  searchText = '';
  selectedCategory = 'Összes';
  categories = ['Összes', 'Elektronika', 'Élelmiszer'];

  // A szűrési logika
  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Összes' || product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }
}
