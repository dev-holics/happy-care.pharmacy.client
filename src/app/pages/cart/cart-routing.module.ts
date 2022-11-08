import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPreviewComponent } from 'src/app/pages/cart/components/cart-preview/cart-preview.component';

const routes: Routes = [
	{
		path: '',
		component: CartPreviewComponent,
		data: {
			title: 'Xem trước giỏ hàng',
			breadcrumb: [
				{
					label: 'Trang chủ',
					url: '',
				},
			],
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CartRoutingModule {}
