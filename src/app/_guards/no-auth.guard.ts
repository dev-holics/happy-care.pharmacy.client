import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';

import { AccountsService } from '../_services/accounts.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private accountService: AccountsService,
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return true;
	}
}
