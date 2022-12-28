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
import { FormGroup } from '@angular/forms';
import { SettingControlModel } from 'src/app/shared/models/setting-control.model';
import { BranchModel } from 'src/app/shared/models/branch.model';
import { BranchService } from 'src/app/shared/services/branch.service';
import { DropdownControl } from 'src/app/shared/models/setting-control.control';
import { DistrictModel } from 'src/app/shared/models/district.model';
import { DynamicFormControlService } from 'src/app/shared/services/dynamic-form.service';
import {
	removeShareData,
	updateShareData,
} from 'src/app/shared/store/share.action';
import { CityModel } from 'src/app/shared/models/city.model';
import { removeAllFromCart } from 'src/app/pages/cart/store/cart/cart.action';

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

	// branch dialog
	branchData: {
		city?: CityModel;
		district?: DistrictModel;
		currentBranch?: BranchModel;
	} = {};
	branches: BranchModel[];
	formGroupBranch: FormGroup;
	settingControlsBranch: SettingControlModel<string | string[]>[];
	isSubmitBranchDialog: boolean = false;
	visibleChangeBranchDialog: boolean = false;

	constructor(
		private accountService: AccountsService,
		private categoryService: CategoryService,
		private branchService: BranchService,
		private cartService: CartService,
		private dynamicFormControlService: DynamicFormControlService,
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
		this.subscribeBranchChange();
		this.initFormGroupBranch();
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

	subscribeBranchChange() {
		this.subscription.add(
			this.store.select('share').subscribe(shareData => {
				if (shareData.currentCity) {
					this.branchData.city = shareData.currentCity;
				}

				if (shareData.currentDistrict) {
					this.branchData.district = shareData.currentDistrict;
				}

				if (shareData.currentBranch) {
					this.branchData.currentBranch = shareData.currentBranch;
				}

				if (shareData.branches.length > 0) {
					this.branches = shareData.branches;
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
				routerLink: ['/tai-khoan'],
			},
			{
				label: 'Lịch sử đặt hàng',
				icon: 'app-icon app-icon-history',
				routerLink: ['/tai-khoan/lich-su-dat-hang'],
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
		this.store.dispatch(removeShareData());
		this.router.navigate(['/auth/login']);
	}

	showWarningLogout() {
		this.isWarningLogoutVisible = true;
	}

	hideWarningLogout() {
		this.isWarningLogoutVisible = false;
	}

	initFormGroupBranch() {
		this.settingControlsBranch = this.initSettingControlBranch();
		this.formGroupBranch = this.dynamicFormControlService.getFormGroup(
			this.settingControlsBranch,
		);

		if (!this.branchData.district) {
			this.formGroupBranch.get('district')?.disable();
		}

		if (!this.branchData.currentBranch) {
			this.formGroupBranch.get('branch')?.disable();
		}
	}

	initSettingControlBranch() {
		const { cities, districts } = LocalStorageHelper.getCommonMetadata();

		const settingControls: SettingControlModel<string | string[]>[] = [
			new DropdownControl({
				key: 'city',
				label: 'thành phố',
				value: this.branchData?.city?.id || '',
				options: cities,
				optionLabel: 'name',
				optionValue: 'id',
				onChange: this.onChangeCitySelection.bind(this),
				validates: {
					required: true,
				},
			}),
			new DropdownControl({
				key: 'district',
				label: 'quận',
				value: this.branchData?.district?.id || '',
				options: districts,
				optionLabel: 'name',
				optionValue: 'id',
				onChange: this.onChangeDistrictSelection.bind(this),
				validates: {
					required: true,
				},
			}),
			new DropdownControl({
				key: 'branch',
				label: 'chi nhánh',
				value: this.branchData?.currentBranch?.id || '',
				options: this.branches,
				optionLabel: 'address',
				optionValue: 'id',
				validates: {
					required: true,
				},
			}),
		];

		return settingControls;
	}

	onChangeCitySelection(event: any) {
		const { districts } = LocalStorageHelper.getCommonMetadata();
		const cityId = event.value;

		this.formGroupBranch.get('district')?.enable();
		this.settingControlsBranch[1].options = districts.filter(
			(d: DistrictModel) => d.cityId === cityId,
		);
	}

	async onChangeDistrictSelection(event: any) {
		const params = {
			page: 1,
			limit: 50,
			cityId: this.formGroupBranch.value.city || '',
			districtId: this.formGroupBranch.value.district || '',
		};

		this.branches = await this.branchService.getListBranch(params);

		this.formGroupBranch.get('branch')?.enable();
		this.settingControlsBranch[2].options = this.branches;
	}

	async toggleVisibleChangeBranchDialog(isShow: boolean) {
		this.visibleChangeBranchDialog = isShow;
	}

	onSubmitChangeBranchDialog() {
    if (this.formGroupBranch.invalid) {
      return;
    }
		const { cities, districts } = LocalStorageHelper.getCommonMetadata();

    if (this.branchData.currentBranch?.id == this.formGroupBranch.value.branch) {
      this.visibleChangeBranchDialog = false;
      return;
    }
		this.branchData.currentBranch = this.branches.find(
			branch => branch.id === this.formGroupBranch.value.branch,
		) as BranchModel;

		this.store.dispatch(
			updateShareData({
				branches: this.branches,
				currentCity: cities.find(
					c => c.id === this.formGroupBranch.value.city,
				) as CityModel,
				currentDistrict: districts.find(
					d => d.id === this.formGroupBranch.value.district,
				) as DistrictModel,
				currentBranch: this.branchData.currentBranch,
			}),
		);
    this.store.dispatch(removeAllFromCart());

		this.visibleChangeBranchDialog = false;
	}
}
