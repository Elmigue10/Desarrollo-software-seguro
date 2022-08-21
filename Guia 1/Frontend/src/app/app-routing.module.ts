import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { RegisterComponent } from './shared/pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: "register", pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'register', component:  RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SingupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
