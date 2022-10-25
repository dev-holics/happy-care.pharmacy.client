import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/pages/main/components/main/main.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from 'src/app/pages/main/components/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: 'trang-chu',
				component: HomeComponent,
				data: {
					title: 'Trang chủ - Happy care',
				},
			},
			{ path: '', pathMatch: 'full', redirectTo: 'trang-chu' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
