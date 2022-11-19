import { Subscriber, take } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { AccountsService } from 'src/app/_services/accounts.service';
import { CategoryService } from 'src/app/pages/category/services/category.service';
import { AppState } from 'src/app/_store/app.reducer';
import { setCategories } from 'src/app/pages/category/store/category.action';
import { CartService } from 'src/app/pages/cart/services/cart.service';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	subscription = new Subscriber();

	categoryItems: MenuItem[];
	accountItems: MenuItem[];
	search: string;
	cartBadge: string;

	isAccountLoggedIn: boolean;
	isWarningLogoutVisible: boolean;

	constructor(
		private accountService: AccountsService,
		private categoryService: CategoryService,
		private cartService: CartService,
		private store: Store<AppState>,
		private router: Router,
	) {
		this.subscribeAccountStatus();
	}

	async ngOnInit() {
		this.categoryItems = [];
		this.initAccountItems();
		this.subscribeCategoryChange();
		this.subscribeCartChange();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	subscribeAccountStatus() {
		this.subscription.add(
			this.accountService.currentUser$.subscribe(currentUser => {
				this.isAccountLoggedIn = !!currentUser;
			}),
		);
	}

	subscribeCategoryChange() {
		this.subscription.add(
			this.store
				.select('category')
				.pipe(
					take(1),
					map(categoryState => categoryState.categories),
				)
				.subscribe(async categories => {
					if (categories.length > 0) {
						this.initCategoryItems(0, this.categoryItems, categories);
						return;
					}
					await this.getCategoryTree();
				}),
		);
	}

	subscribeCartChange() {
		this.subscription.add(
			this.store.select('cart').subscribe(async cart => {
				this.cartBadge = String(cart.totalQuantity);

				if (!cart.isInitial) {
					const cartItems = cart.items.map(item => ({
						quantity: item.quantity,
						productId: item.productId,
					}));

					if (LocalStorageHelper.getCurrentUser()) {
						await this.cartService.updateCartOfCurrentUser(cartItems);
					}
				}
			}),
		);
	}

	async getCategoryTree() {
		const categories = await this.categoryService.getCategoryTree();
		if (this.categoryItems.length === 0) {
			this.initCategoryItems(0, this.categoryItems, categories);
		}
		this.store.dispatch(setCategories({ categories }));
	}

	initCategoryItems(
		level: number,
		categoryItems: MenuItem[] = [],
		categoryData: any[] = [],
	) {
		categoryData.forEach((cD, index) => {
			categoryItems.push({
				label: cD.name,
				routerLink: level ? undefined : [`/danh-muc/${cD.slug}`],
				queryParams: {
					categoryId: cD.id,
					categoryName: cD.name,
				},
			});
			if (cD?.children?.length > 0) {
				categoryItems[index].items = [];
				this.initCategoryItems(
					level + 1,
					categoryItems[index].items,
					cD.children,
				);
			}
		});
	}

	initAccountItems() {
		this.accountItems = [
			{
				label: 'Thông tin tài khoản',
				icon: 'app-icon app-icon-account',
			},
			{
				label: 'Lịch sử đặt hàng',
				icon: 'app-icon app-icon-history',
			},
			{
				separator: true,
			},
			{
				label: 'Đăng xuất',
				icon: 'app-icon app-icon-logout',
				command: this.showWarningLogout.bind(this),
			},
		];
	}

	logout(_event?: any) {
		this.accountService.logout();
		this.router.navigate(['/auth/login']);
	}

	showWarningLogout() {
		this.isWarningLogoutVisible = true;
	}

	hideWarningLogout() {
		this.isWarningLogoutVisible = false;
	}
}
