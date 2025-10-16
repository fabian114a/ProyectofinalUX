import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Recetas } from './recetas/recetas';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component: Home, title: 'Home'},
    {path: 'login', component: Login, title: 'Login'},
    {path: 'signup', component: Login, title: 'Registro'},
    {path: 'receta', component: Recetas, title: 'Receta'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuración de las rutas
  exports: [RouterModule] // Exportar rutas
})
export class AppRoutingModule { }
