import { Subscriber } from 'rxjs';
import { isEmpty } from 'radash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CartItemModel } from 'src/app/pages/cart/models/cart-item.model';
import { AppState } from 'src/app/_store/app.reducer';
import { MenuItem } from 'primeng/api';
import { DELIVERY_METHOD, PAYMENT_METHOD_TYPE } from 'src/app/_config';
import { SettingControlModel } from 'src/app/shared/models/setting-control.model';
import {
	DropdownControl,
	TextareaControl,
	TextboxControl,
} from 'src/app/shared/models/setting-control.control';
import { ReceiverModel } from 'src/app/pages/cart/models';
import { DynamicFormControlService } from 'src/app/shared/services/dynamic-form.service';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';
import { updateReceiverInfo } from 'src/app/pages/cart/store/order/order.action';
import { DistrictModel } from 'src/app/_models/district.model';
import { BranchService } from 'src/app/shared/services/branch.service';
import { BranchModel } from 'src/app/_models/branch.model';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
	subscription = new Subscriber();

	cartItems: CartItemModel[];
	cartQuantity: number;
	totalPrice: number;

	// 2: delivery info
	formGroupDeliveryInfo: FormGroup;
	settingControlsDeliveryInfo: SettingControlModel<string | string[]>[];
	visibleChangeDeliveryInfoDialog: boolean = false;
	isSubmitDeliveryInfoDialog: boolean = false;
	receiverInfo: ReceiverModel;
	isReceiverOptionsEmpty: boolean = true;
	deliveryInfoTabItems: MenuItem[];
	deliveryInfoActiveTab: MenuItem;

	// 3: delivery method
	methodTabItems: MenuItem[];
	activeMethodTab: MenuItem;
	visibleChangeBranchDialog: boolean = false;
	isSubmitBranchDialog: boolean = false;

	// 4: payment method
	selectedPaymentMethod: PAYMENT_METHOD_TYPE = 'CASH';
	branches: BranchModel[];
	selectedBranch: BranchModel;
	selectedBranchIndex: number;

	// alert
	isVisibleAlertBox: boolean = false;
	alertTitle: string;

	constructor(
		private store: Store<AppState>,
		private branchService: BranchService,
		private dynamicFormControlService: DynamicFormControlService,
	) {}

	ngOnInit() {
		this.subscribeReceiverInfoChange();

		this.initTab();
		this.getCartItems();
		this.initFormGroupDeliveryInfo();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	initTab() {
		this.methodTabItems = [
			{
				label: 'Giao hàng tận nơi',
				id: 'cod',
				command: this.changeDeliveryMethodTab.bind(this),
			},
			{
				label: 'Nhận tại nhà thuốc',
				id: 'offline',
				command: this.changeDeliveryMethodTab.bind(this),
			},
		];

		this.deliveryInfoTabItems = [
			{
				label: 'Chọn nơi giao hàng có sẵn',
				id: 'available-delivery',
				command: this.changeDeliveryInfoTab.bind(this),
			},
			{
				label: 'Thêm nơi nhận hàng',
				id: 'add-delivery',
				command: this.changeDeliveryInfoTab.bind(this),
			},
		];

		this.activeMethodTab = this.methodTabItems[0];
		this.deliveryInfoActiveTab = this.deliveryInfoTabItems[0];
	}

	initFormGroupDeliveryInfo() {
		this.settingControlsDeliveryInfo = this.initSettingControlDeliveryInfo();
		this.formGroupDeliveryInfo = this.dynamicFormControlService.getFormGroup(
			this.settingControlsDeliveryInfo,
		);

		this.formGroupDeliveryInfo.get('receiverDistrict')?.disable();
	}

	initSettingControlDeliveryInfo() {
		const { cities, districts } = LocalStorageHelper.getCommonMetadata();

		const settingControls: SettingControlModel<string | string[]>[] = [
			new TextboxControl({
				key: 'receiverName',
				label: 'Tên người nhận',
				value: this.receiverInfo.name || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
			new TextboxControl({
				key: 'receiverPhoneNumber',
				label: 'SĐT người nhận',
				value: this.receiverInfo.phoneNumber || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
			new DropdownControl({
				key: 'receiverCity',
				label: 'thành phố',
				value: this.receiverInfo.city || '',
				options: cities,
				optionLabel: 'name',
				optionValue: 'id',
				onChange: this.onChangeCitySelection.bind(this),
				validates: {
					required: true,
				},
			}),
			new DropdownControl({
				key: 'receiverDistrict',
				label: 'quận',
				value: this.receiverInfo.district || '',
				options: districts,
				optionLabel: 'name',
				optionValue: 'id',
				validates: {
					required: true,
				},
			}),
			new TextboxControl({
				key: 'receiverAddress',
				label: 'Địa chỉ người nhận',
				value: this.receiverInfo.address || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
			new TextareaControl({
				key: 'receiverNote',
				label: 'Ghi chú',
				value: this.receiverInfo.note || '',
				validates: {
					maxLength: 1000,
				},
			}),
		];

		return settingControls;
	}

	subscribeReceiverInfoChange() {
		this.subscription.add(
			this.store.select('order').subscribe(order => {
				this.receiverInfo = order.receiverInfo;
			}),
		);
	}

	getCartItems() {
		this.store.select('cart').subscribe(cartData => {
			this.cartItems = cartData.items;
			this.totalPrice = cartData.totalPrice;
			this.cartQuantity = cartData.items?.length || 0;
		});
	}

	changePaymentMethod(method: PAYMENT_METHOD_TYPE) {
		this.selectedPaymentMethod = method;
	}

	// 2: delivery info
	changeDeliveryInfoTab(_event: any) {
		const selectedTab = this.deliveryInfoTabItems.find(
			t => t.id === _event?.item?.id,
		);

		if (selectedTab) {
			this.deliveryInfoActiveTab = selectedTab;
		}
	}

	toggleVisibleChangeDeliveryInfoDialog(isShow: boolean) {
		if (!isShow && !isEmpty(this.receiverInfo)) {
			this.formGroupDeliveryInfo.disable();
		}

		if (isShow && !isEmpty(this.receiverInfo)) {
			this.formGroupDeliveryInfo.enable();
		}

		this.visibleChangeDeliveryInfoDialog = isShow;
	}

	onSubmitDeliveryInfoDialog() {
		this.isSubmitDeliveryInfoDialog = true;

		if (
			!this.dynamicFormControlService.checkValidate(
				this.formGroupDeliveryInfo,
				this.settingControlsDeliveryInfo,
			)
		) {
			return;
		}

		this.receiverInfo = new ReceiverModel({
			name: this.formGroupDeliveryInfo.value.receiverName,
			phoneNumber: this.formGroupDeliveryInfo.value.receiverPhoneNumber,
			city: this.formGroupDeliveryInfo.value.receiverCity,
			address: this.formGroupDeliveryInfo.value.receiverAddress,
			note: this.formGroupDeliveryInfo.value.receiverNote,
		});

		this.store.dispatch(
			updateReceiverInfo({
				receiverInfo: this.receiverInfo,
			}),
		);

		this.toggleVisibleChangeDeliveryInfoDialog(false);
	}

	onChangeCitySelection(event: any) {
		const { districts } = LocalStorageHelper.getCommonMetadata();
		const cityId = event.value;

		this.formGroupDeliveryInfo.get('receiverDistrict')?.enable();
		this.settingControlsDeliveryInfo[3].options = districts.filter(
			(d: DistrictModel) => d.cityId === cityId,
		);
	}

	// 3: delivery method
	changeDeliveryMethodTab(_event: any) {
		const selectedTab = this.methodTabItems.find(
			t => t.id === _event?.item?.id,
		);

		if (selectedTab) {
			this.activeMethodTab = selectedTab;
		}
	}

	changeBranchSelection(selectedBranchIndex: number) {
		this.selectedBranchIndex = selectedBranchIndex;
	}

	async toggleVisibleChangeBranchDialog(isShow: boolean) {
		if (isShow) {
			const params = {
				page: 1,
				limit: 20,
				cityId: this.formGroupDeliveryInfo.value.receiverCity || '',
				districtId: this.formGroupDeliveryInfo.value.receiverDistrict || '',
			};

			this.branches = await this.branchService.getListBranch(params);
		}

		this.visibleChangeBranchDialog = isShow;
	}

	onSelectBranch() {
		this.selectedBranch = this.branches[this.selectedBranchIndex];
		this.toggleVisibleChangeBranchDialog(false);
	}

	// alert box
	hideAlertBox() {
		this.isVisibleAlertBox = false;
	}

	// confirm order
	onSubmitOrder() {
		if (isEmpty(this.receiverInfo)) {
			this.alertTitle = 'Hãy nhập đầy đủ thông tin người nhận hàng, bạn nhé!';
			this.isVisibleAlertBox = true;
		}

		if (this.activeMethodTab.id === DELIVERY_METHOD.OFFLINE) {
			if (isEmpty(this.selectedBranch)) {
				this.alertTitle = 'Hãy chọn địa điểm bạn muốn nhận hàng nhé';
				this.isVisibleAlertBox = true;
			}
		}
	}
}
