import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  usuario: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar usuario al iniciar
    this.cargarUsuario();

    // Volver a cargar cada vez que termina una navegación (por ejemplo, al venir desde /login)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarUsuario();
      });

    // Escuchar cambios en localStorage desde otras pestañas (opcional)
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'user' || event.key === 'access_token') {
        this.cargarUsuario();
      }
    });
  }

  cargarUsuario(): void {
    const usuarioGuardado = localStorage.getItem('user');
    if (usuarioGuardado) {
      try {
        this.usuario = JSON.parse(usuarioGuardado);
        console.log('Home: usuario cargado', this.usuario);
      } catch (e) {
        console.error('Error parseando user en localStorage', e);
        this.usuario = null;
      }
    } else {
      this.usuario = null;
      console.log('Home: no hay usuario en localStorage');
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    this.usuario = null;
    this.router.navigateByUrl('/login');
  }


  scrollToFooter() {
    const footer = document.getElementById('contacto');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
