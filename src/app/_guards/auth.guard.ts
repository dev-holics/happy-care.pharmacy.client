import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';

import { AccountsService } from '../_services/accounts.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private accountService: AccountsService,
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.accountService.currentUserValue;

		if (currentUser) {
			// authorized so return true
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
