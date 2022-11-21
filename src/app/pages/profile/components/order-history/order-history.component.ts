import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DEFAULT_PAGINATION, ORDER_STATUS, ORDER_TYPE } from 'src/app/_config';
import { OrderService } from 'src/app/pages/cart/services/order.service';
import { OrderHistoryModel } from 'src/app/pages/profile/models/order-history.model';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
	searchKey: string;

	// order type filter
	selectedOrderTypes: string[] = [];

	// order list
	orders: OrderHistoryModel[];
	params: any = {
		page: DEFAULT_PAGINATION.PAGE,
		limit: DEFAULT_PAGINATION.LIMIT,
	};

	statusTabItems: MenuItem[];
	activeStatusTab: MenuItem;

	constructor(
		private orderService: OrderService,
		private toast: MessageService,
	) {}

	async ngOnInit() {
		this.initTab();
		await this.getOrderHistoryList('all');
	}

	initTab() {
		this.statusTabItems = [
			{
				label: 'Tất cả',
				id: 'all',
				command: this.changeStatusMethodTab.bind(this),
			},
			{
				label: 'Đang xử lý',
				id: ORDER_STATUS.PROCESSING,
				command: this.changeStatusMethodTab.bind(this),
			},
			{
				label: 'Đã xác nhận',
				id: ORDER_STATUS.CONFIRMED,
				command: this.changeStatusMethodTab.bind(this),
			},
			{
				label: 'Đang vận chuyển',
				id: ORDER_STATUS.DELIVERING,
				command: this.changeStatusMethodTab.bind(this),
			},
			{
				label: 'Đã thanh toán thành công',
				id: ORDER_STATUS.SUCCESS,
				command: this.changeStatusMethodTab.bind(this),
			},
			{
				label: 'Đã huỷ',
				id: ORDER_STATUS.CANCELED,
				command: this.changeStatusMethodTab.bind(this),
			},
		];

		this.activeStatusTab = this.statusTabItems[0];
	}

	async getOrderHistoryList(orderType: string) {
		const orders = await this.orderService.getOrderHistory(this.params);

		if (!orders.success) {
			return this.toast.add({
				severity: 'error',
				summary: 'Thông báo',
				detail: 'Không thể lấy thông tin nhận hàng',
			});
		}

		this.orders = orders.data as OrderHistoryModel[];
	}

	changeStatusMethodTab(_event: any) {
		const selectedTab = this.statusTabItems.find(
			t => t.id === _event?.item?.id,
		);

		if (selectedTab) {
			this.activeStatusTab = selectedTab;
		}
	}

	onSelectOrderTypeFilter(orderType: string) {
		switch (orderType) {
			case ORDER_TYPE.ONLINE_STORE:
				if (this.selectedOrderTypes.includes(ORDER_TYPE.ONLINE_STORE)) {
					this.selectedOrderTypes = this.selectedOrderTypes.filter(
						type => type !== ORDER_TYPE.ONLINE_STORE,
					);
					break;
				}
				this.selectedOrderTypes = [
					...this.selectedOrderTypes,
					ORDER_TYPE.ONLINE_STORE,
				];
				break;
			case ORDER_TYPE.OFFLINE_STORE:
				if (this.selectedOrderTypes.includes(ORDER_TYPE.OFFLINE_STORE)) {
					this.selectedOrderTypes = this.selectedOrderTypes.filter(
						type => type !== ORDER_TYPE.OFFLINE_STORE,
					);
					break;
				}
				this.selectedOrderTypes = [
					...this.selectedOrderTypes,
					ORDER_TYPE.OFFLINE_STORE,
				];
				break;
			default:
				break;
		}
	}

	transformOrderStatus(status: string) {
		let orderStatus;

		switch (status) {
			case ORDER_STATUS.PROCESSING:
				orderStatus = 'Đang xử lý';
				break;
			case ORDER_STATUS.CONFIRMED:
				orderStatus = 'Đã xác nhận';
				break;
			case ORDER_STATUS.DELIVERING:
				orderStatus = 'Đang vận chuyển';
				break;
			case ORDER_STATUS.SUCCESS:
				orderStatus = 'Thành công';
				break;
			case ORDER_STATUS.CANCELED:
				orderStatus = 'Đã huỷ';
				break;
			default:
				break;
		}

		return orderStatus;
	}
}
