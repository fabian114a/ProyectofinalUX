import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';  // Necesario para ngClass y otras directivas comunes
import { FormsModule } from '@angular/forms';    // Necesario para ngForm
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterLink],  // Asegúrate de que los módulos estén importados
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

   
export class Login {
  // Definimos signal para gestionar el estado reactivo de 'isSignUp'
  isSignUp = signal(false);  // false: formulario de login, true: formulario de registro

  // Método para alternar entre los formularios de login y registro
  toggleSignInSignUp() {
    this.isSignUp.set(!this.isSignUp());  // Cambiar el valor de 'isSignUp'
  }

  // Método para manejar el formulario de registro
  onRegister(registerForm: any) {
    console.log(registerForm.value);  // Lógica para registrar
  }

  // Método para manejar el formulario de inicio de sesión
  onLogin(loginForm: any) {
    console.log(loginForm.value);  // Lógica para iniciar sesión
  }
  
}
