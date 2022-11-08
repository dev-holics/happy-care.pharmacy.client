import {
	AfterContentChecked,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	HostListener,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { AccountsService } from './_services/accounts.service';
import { Subscriber } from 'rxjs';
import { UiHelper } from 'src/app/_helpers/ui.helper';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.reducer';
import { loadCartFromLocalStorage } from 'src/app/pages/cart/store/cart.action';
import { NavigationStart, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent
	implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked
{
	subscription = new Subscriber();

	title = 'happy-care-admin';
	isAppLoading: boolean;
	public settings: Settings;

	constructor(
		public appSettings: AppSettings,
		public accountsService: AccountsService,
		private store: Store<AppState>,
		private router: Router,
		private cd: ChangeDetectorRef,
	) {
		this.settings = this.appSettings.settings;
	}

	ngOnInit() {
		this.accountsService.refreshToken();
		this.detectBrowserReloaded();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	ngAfterViewInit() {
		this.cd.detectChanges();
	}

	ngAfterContentChecked() {
		this.subscribeBlockUi();
		this.cd.detectChanges();
	}

	subscribeBlockUi() {
		this.subscription.add(
			UiHelper.subscribeBlockUI(isBlock => {
				this.isAppLoading = isBlock;
			}),
		);
	}

	detectBrowserReloaded() {
		this.subscription.add(
			this.router.events.subscribe(event => {
				if (event instanceof NavigationStart) {
					this.store.dispatch(loadCartFromLocalStorage());
				}
			}),
		);
	}
}
