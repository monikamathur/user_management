import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { UserComponent } from '../userr/user.component';
import { LoginContainer } from './containers/login/login-page.component';
import { RegisterContainer } from './containers/register/register-page.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginContainer },
      { path: 'register', component: RegisterContainer },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}