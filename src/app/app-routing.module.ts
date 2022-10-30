import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	// { path: '', component: PagesComponent },
	{
		path: '',
		loadChildren: () =>
			import('./pages/main/main.module').then(m => m.MainModule),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./pages/auth/auth.module').then(m => m.AuthModule),
	},
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			// enableTracing: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
