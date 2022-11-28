import { RouterModule, Routes } from '@angular/router';
import { VnpayCallbackComponent } from 'src/app/pages/payment/components/vnpay-callback/vnpay-callback.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: 'vnpay',
		component: VnpayCallbackComponent,
		data: {
			title: 'Trạng thái VN PAY',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PaymentRoutingModule {}
