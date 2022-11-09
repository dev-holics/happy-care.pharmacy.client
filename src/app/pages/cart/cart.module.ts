import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartPreviewComponent } from 'src/app/pages/cart/components/cart-preview/cart-preview.component';
import { CartRoutingModule } from 'src/app/pages/cart/cart-routing.module';
import { OrderComponent } from './components/order/order.component';

@NgModule({
	declarations: [CartPreviewComponent, OrderComponent],
	imports: [
		CommonModule,
		CartRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule.forRoot(),
	],
	exports: [],
	providers: [],
})
export class CartModule {}
