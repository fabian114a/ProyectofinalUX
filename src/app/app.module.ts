import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de que AppRoutingModule esté importado
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';  
import { RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,     
    FormsModule       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
