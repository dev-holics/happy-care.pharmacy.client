import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
	{ path: '', component: PagesComponent, canActivate: [AuthGuard] },
	{
		path: 'auth',
		loadChildren: () =>
			import('./pages/auth/auth.module').then(m => m.AuthModule),
	},
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
