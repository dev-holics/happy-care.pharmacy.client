import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { phoneNumberValidator } from 'src/app/theme/utils/app-validators';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { UserLogin } from 'src/app/_models/user';
import { AccountsService } from 'src/app/_services/accounts.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.reducer';
import {
	loadCartFromLocalStorage,
	removeAllFromCart,
	setToCart,
} from 'src/app/pages/cart/store/cart/cart.action';
import { CartService } from 'src/app/pages/cart/services/cart.service';
import { ImageHelper } from 'src/app/_helpers/image.helper';
import { faker } from '@faker-js/faker';
import { isEmpty } from 'radash';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';

@Component({
	selector: 'app-login',
	styleUrls: ['./login.component.scss'],
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
	user: UserLogin = {
		phoneNumber: '',
		password: '',
		rememberMe: false,
	};
	form: FormGroup;
	settings: Settings;

	loading = false;
	submitted = false;

	constructor(
		public fb: FormBuilder,
		public router: Router,
		public appSettings: AppSettings,
		public accountsService: AccountsService,
		private cartService: CartService,
		private messageService: MessageService,
		private alertService: AlertService,
		private store: Store<AppState>,
	) {
		this.settings = this.appSettings.settings;
		this.form = this.fb.group({
			phoneNumber: [
				null,
				Validators.compose([Validators.required, phoneNumberValidator()]),
			],
			password: [
				null,
				Validators.compose([
					Validators.required,
					//Validators.minLength(8),
					//passwordValidator()
				]),
			],
			rememberMe: [null],
		});
	}

	ngOnInit(): void {}

	onSubmit(values: any): void {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.valid) {
			this.loading = true;
			this.user.phoneNumber = this.form.value.phoneNumber;
			this.user.password = this.form.value.password;
			this.user.rememberMe = this.form.value.rememberMe;

			this.accountsService.login(this.user).subscribe({
				next: async response => {
					if (response.accessToken) {
						await this.getCartItems();
					}

					this.router.navigate(['/']);
				},
				error: err => {
					this.alertService.error(err);
					this.loading = false;
				},
			});
		}
	}

	async getCartItems() {
		if (!isEmpty(LocalStorageHelper.getCartState())) {
			return this.store.dispatch(loadCartFromLocalStorage());
		}

		if (isEmpty(LocalStorageHelper.getCartState())) {
			const cartData = await this.cartService.getCartOfCurrentUser();
			const cartItems = cartData.map((item: any, index: number) => {
				const imageUrls = ImageHelper.getListUrlFromImages(
					item?.product.images,
				);

				return {
					id: String(index),
					productId: item?.product?.id || '',
					productName: item?.product?.name || '',
					price: item?.product?.price || 0,
					quantity: item?.quantity || 0,
					packingSpec: item?.product?.packingSpec || '',
					discount: item?.product?.discount || 0,
					imageUrl: imageUrls ? imageUrls[0] : '' || faker.image.nature(),
				};
			});

			this.store.dispatch(
				setToCart({
					cartItems,
				}),
			);
		}
	}
}
