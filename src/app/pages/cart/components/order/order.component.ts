import { Subscriber } from 'rxjs';
import { isEmpty } from 'radash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CartModel } from 'src/app/pages/cart/models/cart-item-model';
import { AppState } from 'src/app/_store/app.reducer';
import { MenuItem, MessageService } from 'primeng/api';
import {
  DELIVERY_FEE,
	DELIVERY_METHOD,
	FREE_DELIVERY_THRESHOLD,
	ORDER_TYPE,
	PAYMENT_METHOD,
	PAYMENT_METHOD_TYPE,
	PAYMENT_TYPE,
} from 'src/app/_config';
import { SettingControlModel } from 'src/app/shared/models/setting-control.model';
import {
	DropdownControl,
	TextareaControl,
	TextboxControl,
} from 'src/app/shared/models/setting-control.control';
import { ReceiverModel } from 'src/app/pages/cart/models';
import { DynamicFormControlService } from 'src/app/shared/services/dynamic-form.service';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';
import { DistrictModel } from 'src/app/shared/models/district.model';
import { BranchService } from 'src/app/shared/services/branch.service';
import { BranchModel } from 'src/app/shared/models/branch.model';
import { UserSettingService } from 'src/app/shared/services/user-setting.service';
import { OrderService } from 'src/app/pages/cart/services/order.service';
import { Router } from '@angular/router';
import { removeAllFromCart } from 'src/app/pages/cart/store/cart/cart.action';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
	subscription = new Subscriber();

	cartData: CartModel;

	// 2: delivery info
	formGroupDeliveryInfo: FormGroup;
	settingControlsDeliveryInfo: SettingControlModel<string | string[]>[];

	visibleChangeDeliveryInfoDialog: boolean = false;
	visibleAddDeliveryInfoDialog: boolean = false;

	isSubmitDeliveryInfoDialog: boolean = false;

	receiverInfoList: ReceiverModel[];
	receiverInfo: ReceiverModel;
	isReceiverListEmpty: boolean = true;

	selectedReceiverIndex: number;
	selectedReceiverInfo: ReceiverModel;

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
  isConfirmSubmit: boolean = false;
	alertTitle: string;

	constructor(
		private store: Store<AppState>,
		private branchService: BranchService,
		private orderService: OrderService,
		private userSettingService: UserSettingService,
		private dynamicFormControlService: DynamicFormControlService,
		private toast: MessageService,
		public router: Router,
	) {}

	async ngOnInit() {
    const { currentBranch } = LocalStorageHelper.getShareState();
    this.selectedBranch = currentBranch;
		this.subscribeReceiverInfoChange();

		this.initTab();
		this.getCartItems();
		this.initFormGroupDeliveryInfo();

		await this.getReceiverInfoList();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	initTab() {
		this.methodTabItems = [
			{
				label: 'Giao h??ng t???n n??i',
				id: 'cod',
				command: this.changeDeliveryMethodTab.bind(this),
			},
			{
				label: 'Nh???n t???i nh?? thu???c',
				id: 'offline',
				command: this.changeDeliveryMethodTab.bind(this),
			},
		];

		this.deliveryInfoTabItems = [
			{
				label: 'Ch???n n??i giao h??ng c?? s???n',
				id: 'available-delivery',
				command: this.changeDeliveryInfoTab.bind(this),
			},
			{
				label: 'Th??m n??i nh???n h??ng',
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
				label: 'T??n ng?????i nh???n',
				value: this.receiverInfo.name || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
			new TextboxControl({
				key: 'receiverPhoneNumber',
				label: 'S??T ng?????i nh???n',
				value: this.receiverInfo.phoneNumber || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
			new DropdownControl({
				key: 'receiverCity',
				label: 'Th??nh Ph???',
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
				label: 'Qu???n',
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
				label: '?????a ch??? ng?????i nh???n',
				value: this.receiverInfo.address || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
			new TextareaControl({
				key: 'receiverNote',
				label: 'Ghi ch??',
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
			this.cartData = {
				items: cartData.items,
				totalPrice: cartData.totalPrice,
				totalQuantity: cartData.totalQuantity,
			};
		});
	}

	async getReceiverInfoList() {
		const result = await this.userSettingService.getUserSettings();

		if (!result.success) {
			return this.toast.add({
				severity: 'error',
				summary: 'Th??ng b??o',
				detail: 'Kh??ng th??? l???y th??ng tin nh???n h??ng',
			});
		}

		this.isReceiverListEmpty = result?.data?.length === 0;
		return (this.receiverInfoList = result.data as ReceiverModel[]);
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

	async toggleVisibleChangeDeliveryInfoDialog(isShow: boolean) {
		if (!isShow) {
			this.selectedReceiverIndex = -1;
		}

		this.visibleChangeDeliveryInfoDialog = isShow;
	}

	toggleVisibleAddDeliveryInfoDialog(isShow: boolean) {
		if (!isShow && !isEmpty(this.receiverInfo)) {
			this.formGroupDeliveryInfo.disable();
		}

		if (isShow && !isEmpty(this.receiverInfo)) {
			this.formGroupDeliveryInfo.enable();
		}

		this.visibleAddDeliveryInfoDialog = isShow;
	}

	async onSubmitAddDeliveryInfoDialog() {
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
			district: this.formGroupDeliveryInfo.value.receiverDistrict,
			address: this.formGroupDeliveryInfo.value.receiverAddress,
			note: this.formGroupDeliveryInfo.value.receiverNote,
		});

		const result = await this.userSettingService.addUserSetting(
			this.receiverInfo,
		);

		if (!result.success) {
			return this.toast.add({
				severity: 'error',
				summary: 'Th??ng b??o',
				detail: 'Kh??ng th??? th??m th??ng tin nh???n h??ng',
			});
		}

		await this.getReceiverInfoList();

		this.toggleVisibleAddDeliveryInfoDialog(false);

		return this.toast.add({
			severity: 'info',
			summary: 'Th??ng b??o',
			detail: '???? th??m th??ng tin nh???n h??ng th??nh c??ng!',
		});
	}

	onSelectDeliveryInfo() {
		this.selectedReceiverInfo =
			this.receiverInfoList[this.selectedReceiverIndex];
		this.toggleVisibleChangeDeliveryInfoDialog(false);
	}

	changeReceiverInfoSelection(index: number) {
		this.selectedReceiverIndex = index;
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

	// 4: payment method
	changePaymentMethod(method: PAYMENT_METHOD_TYPE) {
		this.selectedPaymentMethod = method;
	}

	// alert box
	hideAlertBox() {
		this.isVisibleAlertBox = false;
	}

  showConfirmSubmitOrder() {
		this.isConfirmSubmit = true;
	}

  hideConfirmSubmitOrder() {
		this.isConfirmSubmit = false;
	}

	// confirm order
	async onSubmitOrder() {
		if (isEmpty(this.selectedReceiverInfo)) {
			this.alertTitle = 'H??y nh???p ?????y ????? th??ng tin ng?????i nh???n h??ng, b???n nh??!';
			this.isVisibleAlertBox = true;
			return;
		}

    let deliveryType = "PICK_UP";

    if (this.activeMethodTab.id === DELIVERY_METHOD.COD) {
      if (this.cartData.totalPrice <= FREE_DELIVERY_THRESHOLD) {
        this.cartData.totalPrice += DELIVERY_FEE;
      }
      deliveryType = "SHIP";
    }

    const paymentType =
				this.selectedPaymentMethod === PAYMENT_METHOD.CASH
					? PAYMENT_TYPE.CASH
					: PAYMENT_TYPE.TRANSFER;

    const orderResult = await this.orderService.sendPaymentRequest(
				this.cartData,
				this.selectedReceiverInfo,
				this.selectedBranch,
				paymentType,
				ORDER_TYPE.ONLINE_STORE,
        deliveryType,
			);

		if (orderResult?.success) {
			this.store.dispatch(removeAllFromCart());

			if (orderResult?.data) {
				window.location.replace(orderResult.data);
			}

			return this.router.navigate(['/gio-hang/thanh-toan-thanh-cong']);
		}
    this.getCartItems();

		return this.toast.add({
			severity: 'error',
			summary: 'Th??ng b??o',
			detail: 'R???t ti???c, ?????t h??ng kh??ng th??nh c??ng!',
		});
	}

  displayShippingFee() {
    return this.activeMethodTab.id === DELIVERY_METHOD.COD && this.cartData.totalPrice < 250000;
  }

  getTotalPrice() {
    if (this.activeMethodTab.id === DELIVERY_METHOD.OFFLINE) {
      return this.cartData.totalPrice;
    }
    return this.cartData.totalPrice >= 250000 ? this.cartData.totalPrice : this.cartData.totalPrice + 25000;
  }
}
