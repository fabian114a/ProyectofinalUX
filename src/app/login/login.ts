import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  isSignUp = signal(false);
  mensaje = signal('');

  constructor(private api: ApiService, private router: Router) {}

  toggleSignInSignUp() {
    this.isSignUp.set(!this.isSignUp());
  }

  onRegister(form: any) {
    this.api.register(form.value).subscribe({
      next: (res: any) => this.mensaje.set(res.message),
      error: (err: any) => this.mensaje.set(err.error.message || 'Error al registrar'),
    });
  }

  onLogin(form: any) {
    this.api.login(form.value).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.mensaje.set(res.message);
          // ✅ Guarda el usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(form.value));
          // ✅ Redirige al home
          this.router.navigate(['/home']);
        } else {
          this.mensaje.set('Credenciales incorrectas');
        }
      },
      error: (err: any) => {
        this.mensaje.set(err.error.message || 'Error al iniciar sesión');
      },
    });
  }
}
