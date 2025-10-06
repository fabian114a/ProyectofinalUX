import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignUp: boolean = false;

  constructor() { }

  toggleSignInSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  onLogin(form: any) {
    console.log('Usuario iniciado sesión:', form.value);
  }

  onRegister(form: any) {
    console.log('Usuario registrado:', form.value);
  }
}
