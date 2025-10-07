import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';  // Si tienes un HomeComponent
import { RecetasComponent } from './recetas/recetas.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a home por defecto
  { path: 'home', component: HomeComponent, title:'Home' },          // Ruta para la página de inicio
  { path: 'login', component: LoginComponent, title:'Login'},        // Ruta para Login
  { path: 'signup', component: LoginComponent, title:'Registro' },       // Ruta para Registro (en el mismo componente de Login)
  { path: 'recetas', component: RecetasComponent, title:'Recetas' },             // Ruta para Recetas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuración de las rutas
  exports: [RouterModule] // Exportar rutas
})
export class AppRoutingModule { }
