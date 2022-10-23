import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/pages/auth/components/login/login.component';
import { AlertComponent } from 'src/app/_components/alerts/alert.component';
import { RegisterComponent } from 'src/app/pages/auth/components/register/register.component';
import { AuthRoutingModule } from 'src/app/pages/auth/auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		AlertComponent,
		AuthComponent,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		ToastModule,
	],
})
export class AuthModule {}
