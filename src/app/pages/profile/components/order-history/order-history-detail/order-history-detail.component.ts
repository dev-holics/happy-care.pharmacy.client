import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrderService} from "src/app/pages/cart/services/order.service";
import {OrderHistoryModel} from "src/app/pages/profile/models/order-history.model";

@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  styleUrls: ['./order-history-detail.component.scss']
})
export class OrderHistoryDetailComponent implements OnInit, OnChanges {
  @Input() orderId: string;

  orderHistoryDetail: OrderHistoryModel;
  cancelOrderPopup : boolean;
  receiveOrderPopup : boolean;

  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit() {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.orderId) {
      this.orderId = changes.orderId.currentValue;

      const result = await this.orderService.getOrderDetail(this.orderId);
      this.orderHistoryDetail = result.data as OrderHistoryModel;
    }
  }

  onShowCancelOrderPopup() {
    this.cancelOrderPopup = true;
  }

  onHideCancelOrderPopup() {
    this.cancelOrderPopup = false;
  }

  onShowReceiveOrderPopup() {
    this.receiveOrderPopup = true;
  }

  onHideReceiveOrderPopup() {
    this.receiveOrderPopup = false;
  }

  async cancelOrder(orderId: string) {
    await this.orderService.cancelOrder(orderId);
    window.location.reload();
  }

  async receiveOrder(orderId: string) {
    await this.orderService.receiveOrder(orderId);
    window.location.reload();
  }
}
