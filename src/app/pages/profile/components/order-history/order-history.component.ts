import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DEFAULT_PAGINATION, ORDER_STATUS, ORDER_TYPE } from 'src/app/_config';

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
	params: any = {
		page: DEFAULT_PAGINATION.PAGE,
		limit: DEFAULT_PAGINATION.LIMIT,
	};

	statusTabItems: MenuItem[];
	activeStatusTab: MenuItem;

	constructor(
		private toast: MessageService,
	) {}

	ngOnInit() {
		this.initTab();
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
				label: 'Thành công',
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
}
