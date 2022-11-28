import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/auth/components/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/components/register/register.component';
import { AuthComponent } from 'src/app/pages/auth/components/auth/auth.component';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{ path: 'login', component: LoginComponent, data: { title: 'login' } },
			{
				path: 'register',
				component: RegisterComponent,
				data: { title: 'register' },
			},
			{ path: '**', redirectTo: 'login' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
