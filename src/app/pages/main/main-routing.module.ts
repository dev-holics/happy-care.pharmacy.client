import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from 'src/app/pages/main/components/home/home.component';
import { ProductListComponent } from 'src/app/pages/main/components/product-list/product-list.component';
import { ProductDetailComponent } from 'src/app/pages/main/components/product-detail/product-detail.component';
import { NoAuthGuard } from 'src/app/_guards/no-auth.guard';

const routes: Routes = [
	{
		path: '',
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
		path: 'danh-muc/:categorySlug',
		component: ProductListComponent,
		canActivate: [NoAuthGuard],
		data: {
			title: 'Danh sách sản phẩm - Happy care',
			breadcrumb: [
				{
					label: 'Trang chủ',
					url: '/',
				},
				{
					label: 'Danh sách sản phẩm',
					url: '',
				},
			],
		},
	},
	{
		path: 'danh-muc/:categorySlug/san-pham/:productId',
		component: ProductDetailComponent,
		data: {
			title: 'Chi tiết sản phẩm - Happy care',
			breadcrumb: [
				{
					label: 'Trang chủ',
					url: '/',
				},
				{
					label: 'Chi tiết sản phẩm',
					url: '',
				},
			],
		},
	},
	{ path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
