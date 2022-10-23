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
		private messageService: MessageService,
		public appSettings: AppSettings,
		public fb: FormBuilder,
		public router: Router,
		public accountsService: AccountsService,
		private alertService: AlertService,
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

		if (this.accountsService.currentUser$) {
			//this.router.navigate(['/'])
		}
	}

	ngOnInit(): void {}

	public onSubmit(values: any): void {
		this.submitted = true;
		this.alertService.clear();
		if (this.form.valid) {
			this.loading = true;
			this.user.phoneNumber = this.form.value.phoneNumber;
			this.user.password = this.form.value.password;
			this.user.rememberMe = this.form.value.rememberMe;
			this.accountsService.login(this.user).subscribe({
				next: response => {
					this.router.navigate(['/']);
				},
				error: err => {
					this.alertService.error(err);
					this.loading = false;
				},
			});
		}
	}

	ngAfterViewInit() {
		this.settings.loadingSpinner = false;
	}
}
