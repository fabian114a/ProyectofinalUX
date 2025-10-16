import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-recetas',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class Recetas {

}
