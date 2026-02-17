import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../service/category.service';
import { DiscountService } from '../../service/discount.service';
import { Discount } from '../../interfaces/discount';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  categories:Category[] = []
  discounts: Discount[] = []

  constructor (private categoryService: CategoryService, private discountservice: DiscountService) {}

  ngOnInit(){
    this.categoryService.getCategory()
    .subscribe({
      next:(data) => {
        this.categories = data
        console.log(this.categories);
        
      },
      error: (err) => {
        console.error('Hiba történt a lekérés során:', err);
      }
    }),
    this.discountservice.getDiscount()
    .subscribe({
      next:(data) => {
        this.discounts = data
        console.log(this.discounts);
        
      },
      error: (err) => {
        console.error('Hiba történt a lekérés során:', err);
      }
    })
  }
}
