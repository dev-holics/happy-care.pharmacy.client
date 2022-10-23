import { Component, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { AccountsService } from './_services/accounts.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'happy-care-admin';
	public settings: Settings;
	constructor(
		public appSettings: AppSettings,
		public accountsService: AccountsService,
	) {
		this.settings = this.appSettings.settings;
	}
	ngOnInit(): void {
		this.accountsService.refreshToken();
	}
}
