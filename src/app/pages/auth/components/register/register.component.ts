import * as _ from 'radash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import { phoneNumberValidator } from 'src/app/theme/utils/app-validators';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { MessageService } from 'primeng/api';
import { AccountsService } from 'src/app/_services/accounts.service';
import { Subscriber } from 'rxjs';
import { ERROR_STATUS_CODE } from 'src/app/_config';

@Component({
	selector: 'app-register',
	styleUrls: ['./register.component.scss'],
	templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
	subscribe: Subscriber<any> = new Subscriber<any>();
	form: FormGroup;
	settings: Settings;
	isFormSubmitted: boolean = false;

	constructor(
		private toast: MessageService,
		public appSettings: AppSettings,
		public fb: FormBuilder,
		public router: Router,
		public accountsService: AccountsService,
	) {
		this.settings = this.appSettings.settings;
	}

	ngOnInit() {
		this.initForm();
	}

	ngOnDestroy() {
		this.subscribe.unsubscribe();
	}

	initForm() {
		this.form = new FormGroup({
			phoneNumber: new FormControl(null, [
				Validators.required,
				phoneNumberValidator(),
			]),
			password: new FormControl(
				null,
				Validators.compose([Validators.required]),
			),
			confirmPassword: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				this.passwordMatcher.bind(this),
			]),
			fullname: new FormControl('', [
				Validators.required,
				Validators.minLength(4),
			]),
			email: new FormControl('', [Validators.email, Validators.minLength(4)]),
		});
	}

	passwordMatcher(control: FormControl): { [s: string]: boolean } | null {
		if (this.form && control.value !== this.form.value.password) {
			return { passwordNotMatch: true };
		}

		return null;
	}

	onSubmit(_values: any): void {
		this.isFormSubmitted = true;
		if (this.form.valid) {
			const signUpData = _.pick(this.form.value, [
				'phoneNumber',
				'password',
				'fullname',
				'email',
			]);
			this.subscribe.add(
				this.accountsService.signUp(signUpData).subscribe({
					next: _success => {
						this.toast.add({
							severity: 'info',
							summary: 'Thông báo',
							detail: 'Đăng ký thành công',
						});
						this.router.navigate(['/auth/login']);
					},
					error: err => {
						if (
							err?.error?.statusCode === ERROR_STATUS_CODE.UserPhoneNumberExist
						) {
							return this.toast.add({
								severity: 'error',
								summary: 'Thông báo',
								detail: 'Số điện thoại này đã được đăng ký',
							});
						}
						this.toast.add({
							severity: 'error',
							summary: 'Thông báo',
							detail: 'Đăng ký không thành công',
						});
					},
				}),
			);
		}
	}

	ngAfterViewInit() {
		this.settings.loadingSpinner = false;
	}
}
