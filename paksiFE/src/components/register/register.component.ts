import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterData } from '../../interfaces/register';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, NavbarComponent, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hasError:boolean = false;
  isLoading: boolean = false;
  registerData:RegisterData = {
    username:"",
    email:"",
    password:"",
  }

  constructor (private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.isLoading) return;
    this.isLoading = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[\p{L}\p{N}_ ]{3,20}$/u;

    if (
    !this.registerData.username ||
    !this.registerData.email ||
    !this.registerData.password
  ) {
    return alert("Nem töltötted ki az összes mezőt!");
  }

  if (!emailRegex.test(this.registerData.email)) {
    return alert("Érvénytelen e-mail cím!");
  }

  if (!usernameRegex.test(this.registerData.username)) {
    return alert("Érvénytelen teljes név!")
  }

    this.authService.register(
    this.registerData.username,
    this.registerData.email,
    this.registerData.password
  ).subscribe({
    next: (response) => {
      this.isLoading = false;
      alert("Sikeres regisztráció!");
      this.hasError = false;
      this.router.navigate(['login']);
    },
    error: (error) => {
      this.isLoading = false;
      console.error('Register error:', error);
      if (error.status === 409) {
        alert("Nem sikerült a regisztráció! Már regisztráltak evvel az e-mail címmel!");
        this.hasError = true;
        return;
      }
      alert("Nem sikerült a regisztráció! Próbáld újra.");
      this.hasError = true;
      return;
    }
  });
  }
}
