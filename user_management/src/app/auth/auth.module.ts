import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './components/login/login.component';
import { LoginContainer } from './containers/login/login-page.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterContainer } from './containers/register/register-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from './effects/auth.effects';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent, LoginContainer, RegisterComponent, RegisterContainer],
  entryComponents: [LoginComponent]
})
export class AuthModule {}