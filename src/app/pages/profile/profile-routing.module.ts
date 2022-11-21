import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderHistoryComponent } from 'src/app/pages/profile/components/order-history/order-history.component';
import { ProfileComponent } from 'src/app/pages/profile/components/profile/profile.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		data: {
			title: 'Thông tin tài khoản',
			breadcrumb: [
				{
					label: 'Trang chủ',
					url: '/',
				},
				{
					label: 'Tài khoản',
					url: '',
				},
			],
		},
	},
	{
		path: 'lich-su-dat-hang',
		component: OrderHistoryComponent,
		data: {
			title: 'Lịch sử đặt hàng',
			breadcrumb: [
				{
					label: 'Trang chủ',
					url: '/',
				},
				{
					label: 'Tài khoản',
					url: '/tai-khoan',
				},
				{
					label: 'Lịch sử đặt hàng',
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
export class ProfileRoutingModule {}
