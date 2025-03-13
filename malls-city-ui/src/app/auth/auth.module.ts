import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [AuthGuard, AuthService],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
