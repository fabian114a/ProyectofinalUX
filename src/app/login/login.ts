import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  isSignUp = signal(false);

  // URL base del backend (ajusta si es otro host/puerto)
  private baseUrl = 'http://localhost:5000/api';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      if (url && url[0] && url[0].path === 'signup') {
        this.isSignUp.set(true);
      } else {
        this.isSignUp.set(false);
      }
    });
  }

  toggleSignInSignUp() {
    this.isSignUp.set(!this.isSignUp());
  }

  // Registro: recibe el form ngForm
  onRegister(registerForm: any) {
    const payload = {
      name: registerForm.value.name || '',
      email: (registerForm.value.email || '').toLowerCase(),
      password: registerForm.value.password || ''
    };

    this.http.post<any>(`${this.baseUrl}/register`, payload).subscribe({
      next: (res) => {
        console.log('Registro OK', res);
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          confirmButtonText: 'Aceptar'
        });
        // Opcional: después de registrar, redirigir a login
        this.isSignUp.set(false);
      },
      error: (err) => {
        console.error('Error en registro', err);
        const msg = err?.error?.msg || 'Error en registro';
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: msg,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  // Login
  onLogin(loginForm: any) {
    const payload = {
      email: (loginForm.value.email || '').toLowerCase(),
      password: loginForm.value.password || ''
    };

    this.http.post<any>(`${this.baseUrl}/login`, payload).subscribe({
      next: (res) => {
        console.log('Login OK', res);
        // Guardar token y datos de usuario
        if (res && res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user || {}));
          // Navegar a una ruta segura (ajusta a tu app)
          this.router.navigate(['/home']);
        } else {
          // Mostrar un mensaje de error con SweetAlert2 si no hay respuesta adecuada
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Respuesta inesperada del servidor.',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (err) => {
        console.error('Error login', err);
        const msg = err?.error?.msg || 'Error en login';
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: msg,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
