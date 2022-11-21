import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileModel } from 'src/app/pages/profile/models/profile.model';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	profile: ProfileModel;

	constructor(
		private userService: UserService,
		private toast: MessageService,
	) {}

	async ngOnInit() {
		await this.getProfileInfo();
	}

	async getProfileInfo() {
		const profile = await this.userService.getUserProfile();

		if (!profile.success) {
			return this.toast.add({
				severity: 'error',
				summary: 'Thông báo',
				detail: 'Không thể nhận thông tin cá nhân',
			});
		}

		this.profile = profile.data as ProfileModel;
	}
}
