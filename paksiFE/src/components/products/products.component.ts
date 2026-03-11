import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Products } from '../../interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  searchTerm: string = '';
  products: Products[] = [];
  
  categories: string[] = [];
  sizes: string[] = [];
  packaging: string[] = [];

  selectedFilters = {
    categories: [] as string[],
    sizes: [] as string[],
    packaging: [] as string[]
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.categories = this.collectCategories(this.products);
        this.updateAvailableFilters(); 
      },
      error: (err) => console.error('Hiba történt:', err)
    });
  }

  updateAvailableFilters() {
    const relevantProducts = this.selectedFilters.categories.length > 0
      ? this.products.filter(p => this.selectedFilters.categories.includes(p.category))
      : this.products;

    this.sizes = this.collectUniqueField(relevantProducts, 'handle');
    this.packaging = this.collectUniqueField(relevantProducts, 'storageType');
  }

  private collectUniqueField(products: Products[], field: keyof Products): string[] {
    const set = new Set<string>();
    products.forEach(prod => {
      const value = prod[field];
      if (typeof value === 'string') set.add(value);
    });
    return Array.from(set);
  }

  collectCategories(products: Products[]): string[] {
    return [...new Set(products.map(p => p.category))];
  }

  getFieldsByCategory(category: string, field: keyof Products): string[] {
    const filtered = this.products.filter(p => p.category === category);
    const set = new Set<string>();
    filtered.forEach(prod => {
      const value = prod[field];
      if (typeof value === 'string') set.add(value);
    });
    return Array.from(set);
  }

  toggleFilter(type: 'categories' | 'sizes' | 'packaging', value: string, category?: string) {
  const filterValue = (type !== 'categories' && category) 
    ? `${category}|${value}` 
    : value;

  const index = this.selectedFilters[type].indexOf(filterValue);
  
  if (index === -1) {
    this.selectedFilters[type].push(filterValue);
  } else {
    this.selectedFilters[type].splice(index, 1);
  }
}

  get filteredProducts() {
  return this.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

    const matchesCategory = this.selectedFilters.categories.length === 0 || 
                            this.selectedFilters.categories.includes(product.category);

    const matchesSize = this.selectedFilters.sizes.length === 0 || 
                         this.selectedFilters.sizes.includes(`${product.category}|${product.handle}`);

    const matchesPackaging = this.selectedFilters.packaging.length === 0 || 
                              this.selectedFilters.packaging.includes(`${product.category}|${product.storageType}`);

    return matchesSearch && matchesCategory && matchesSize && matchesPackaging;
  });
}
}