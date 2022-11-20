import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VnpayModel } from 'src/app/pages/payment/models/vnpay.model';
import { PaymentService } from 'src/app/pages/payment/services/payment.service';

@Component({
	selector: 'app-vnpay-callback',
	templateUrl: './vnpay-callback.component.html',
	styleUrls: ['./vnpay-callback.component.scss'],
})
export class VnpayCallbackComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	vnpayData: VnpayModel;

	constructor(
		private paymentService: PaymentService,
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.subscribeUrlChange();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	subscribeUrlChange() {
		this.subscription.add(
			this.route.queryParams.subscribe(async param => {
				if (!param) return;

				await this.paymentService.getCallBackVnPay(param);

				this.vnpayData = {
					amount: (param?.vnp_Amount || 0) / 100,
					bankCode: param?.vnp_BankCode || '',
					bankTransactionNo: param?.vnp_BankTranNo || '',
					cardType: param?.vnp_CardType || '',
					payDate: param?.vnp_PayDate || '',
					transactionNo: param?.vnp_TransactionNo || '',
					status: param?.vnp_TransactionStatus || '01',
				};
			}),
		);
	}
}
