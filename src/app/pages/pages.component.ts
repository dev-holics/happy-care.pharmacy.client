import {
	Component,
	OnInit,
	ViewChild,
	HostListener,
	ViewChildren,
	QueryList,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';
import { AccountsService } from '../_services/accounts.service';

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
	currentUser: any;

	constructor(
		public appSettings: AppSettings,
		public router: Router,
		private accountService: AccountsService,
	) {
		this.accountService.currentUser$.subscribe(x => (this.currentUser = x));
	}

	logout() {
		this.accountService.logout();
		this.router.navigate(['/auth/login']);
	}
}
