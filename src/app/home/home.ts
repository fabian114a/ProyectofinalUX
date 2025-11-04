import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  usuario = signal<any>(null);

  ngOnInit() {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuario.set(JSON.parse(data));
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuario.set(null);
  }
}
