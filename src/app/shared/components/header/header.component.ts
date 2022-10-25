import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscriber } from 'rxjs';
import { AccountsService } from 'src/app/_services/accounts.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	subscribe = new Subscriber();

	categoryItems: MenuItem[];
	accountItems: MenuItem[];
	search: string;
	isAccountLoggedIn: boolean;

	constructor(private accountService: AccountsService, private router: Router) {
		this.subscribeAccountStatus();
	}

	ngOnInit() {
		this.initCategoryItems();
		this.initAccountItems();
	}

	ngOnDestroy() {
		this.subscribe.unsubscribe();
	}

	subscribeAccountStatus() {
		this.subscribe.add(
			this.accountService.currentUser$.subscribe(currentUser => {
				this.isAccountLoggedIn = !!currentUser;
			}),
		);
	}

	initCategoryItems() {
		this.categoryItems = [
			{
				label: 'Thực phẩm chức năng',
				items: [
					{
						label: 'Sinh lý - nội tiết tố',
						icon: 'pi pi-fw pi-plus',
					},
					{
						label: 'Sức khoẻ tim mạch',
						icon: 'pi pi-fw pi-plus',
					},
					{
						label: 'Hỗ trợ tiêu hoá',
						icon: 'pi pi-fw pi-plus',
					},
				],
			},
			{
				label: 'Dược mỹ phẩm',
			},
			{
				label: 'Chăm sóc cá nhân',
			},
			{
				label: 'Thuốc',
			},
			{
				label: 'Thiết bị y tế',
			},
			{
				label: 'Bệnh',
			},
			{
				label: 'Góc sức khoẻ',
			},
		];
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
				command: this.logout.bind(this),
			},
		];
	}

	logout(_event: any) {
		this.accountService.logout();
		this.router.navigate(['/auth/login']);
	}
}
