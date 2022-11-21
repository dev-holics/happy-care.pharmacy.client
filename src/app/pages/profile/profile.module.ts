import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from 'src/app/pages/profile/profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderHistoryListComponent } from './components/order-history/order-history-list/order-history-list.component';

@NgModule({
	declarations: [OrderHistoryComponent, ProfileComponent, OrderHistoryListComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule.forRoot(),
	],
})
export class ProfileModule {}
