import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AccountsService } from '../_services/accounts.service';

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
	currentUser: any;

	constructor(public router: Router, private accountService: AccountsService) {
		this.accountService.currentUser$.subscribe(x => (this.currentUser = x));
	}

	logout() {
		this.accountService.logout();
		this.router.navigate(['/auth/login']);
	}
}
