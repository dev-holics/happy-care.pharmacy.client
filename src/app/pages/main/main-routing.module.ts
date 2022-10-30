import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/pages/main/components/main/main.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from 'src/app/pages/main/components/home/home.component';
import { ProductListComponent } from 'src/app/pages/main/components/product-list/product-list.component';
import { ProductDetailComponent } from 'src/app/pages/main/components/product-detail/product-detail.component';

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
					breadcrumb: [
						{
							label: 'Trang chủ',
							url: '',
						},
					],
				},
			},
			{
				path: 'san-pham',
				component: ProductListComponent,
				data: {
					title: 'Sản phẩm - Happy care',
					breadcrumb: [
						{
							label: 'Sản phẩm',
							url: '',
						},
					],
				},
			},
			{
				path: 'san-pham/:id',
				component: ProductDetailComponent,
				data: {
					title: 'Chi tiết sản phẩm - Happy care',
					breadcrumb: [
						{
							label: 'Sản phẩm',
							url: '/san-pham',
						},
						{
							label: 'Chi tiết sản phẩm',
							url: '',
						},
					],
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
