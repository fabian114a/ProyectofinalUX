import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';  // Importar el enrutador
import { CommonModule } from '@angular/common';  // Para ngClass y otras directivas comunes
import { FormsModule } from '@angular/forms';    
import { routes } from './app.routes';  
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule,RouterModule, HttpClientModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']  
})
export class App {
  protected readonly title = signal('ReceFacil');
}
