import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPreviewComponent } from 'src/app/pages/cart/components/cart-preview/cart-preview.component';
import { OrderComponent } from 'src/app/pages/cart/components/order/order.component';
import { OrderSuccessComponent } from 'src/app/pages/cart/components/order-success/order-success.component';

const routes: Routes = [
	{
		path: '',
		component: CartPreviewComponent,
		data: {
			title: 'Xem trước giỏ hàng',
			breadcrumb: [
				{
					label: 'Trang chủ',
					url: '/',
				},
				{
					label: 'Giỏ hàng',
					url: '',
				},
			],
		},
	},
	{
		path: 'thanh-toan',
		component: OrderComponent,
		data: {
			title: 'Thanh toán',
			breadcrumb: [
				{
					label: 'Trang chủ',
					url: '/',
				},
				{
					label: 'Giỏ hàng',
					url: '/gio-hang',
				},
				{
					label: 'Thanh toán',
					url: '',
				},
			],
		},
	},
	{
		path: 'thanh-toan-thanh-cong',
		component: OrderSuccessComponent,
		data: {
			title: 'Thanh toán thanh cong',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CartRoutingModule {}
