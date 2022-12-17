import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import {DEFAULT_PAGINATION, ORDER_STATUS} from "src/app/_config";
import {OrderHistoryModel} from "src/app/pages/profile/models/order-history.model";
import {OrderService} from "src/app/pages/cart/services/order.service";
import {MessageService} from "primeng/api";

@Component({
	selector: 'app-order-history-list',
	templateUrl: './order-history-list.component.html',
	styleUrls: ['./order-history-list.component.scss'],
})
export class OrderHistoryListComponent implements OnInit, OnChanges {
	@Input() orderStatus: string;

  orders: OrderHistoryModel[];
  selectedOrderIndex: number;
  isOrderListEmpty: boolean = false;

  // pagination
  totalData: number;
  params: any = {
    page: DEFAULT_PAGINATION.PAGE,
    limit: 3,
  };

  constructor(
    private orderService: OrderService,
    private toast: MessageService,
  ) {}

	ngOnInit() {}

	async ngOnChanges(changes: SimpleChanges) {
    if (changes.orderStatus) {
      this.orderStatus = changes.orderStatus.currentValue;
      await this.getOrderHistoryList(this.orderStatus);

      this.isOrderListEmpty = this.orders?.length === 0;
    }
  }

  async getOrderHistoryList(orderStatus: string) {
    if (orderStatus !== 'all') {
      this.params = {
        ...this.params,
        status: orderStatus,
      };
    }

    const orders = await this.orderService.getOrderHistory(this.params);

    if (!orders.success) {
      return this.toast.add({
        severity: 'error',
        summary: 'Thông báo',
        detail: 'Không thể lấy thông tin nhận hàng',
      });
    }

    this.totalData = orders.totalData;
    this.orders = orders.data as OrderHistoryModel[];
  }

  onSelectOrder(orderCode: string) {
    this.selectedOrderIndex = this.orders.findIndex(o => o.orderCode === orderCode);
  }

  async paginate(event: any) {
    console.log(event);

    this.params = {
      ...this.params,
      page: event.page + 1,
    };

    return this.getOrderHistoryList(this.orderStatus);
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
