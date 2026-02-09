import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  categories:Category[] = []

  constructor (private categoryService: CategoryService) {}

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
    })
  }
}
