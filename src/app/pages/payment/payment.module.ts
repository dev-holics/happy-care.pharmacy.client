import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VnpayCallbackComponent } from './components/vnpay-callback/vnpay-callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentRoutingModule } from 'src/app/pages/payment/payment-routing.module';

@NgModule({
	declarations: [VnpayCallbackComponent],
	imports: [
		CommonModule,
		PaymentRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule.forRoot(),
	],
})
export class PaymentModule {}
