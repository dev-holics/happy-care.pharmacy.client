export class ProfileModel {
	id: string;
	fullname: string;
	phoneNumber: string;
	email: string;
	gender?: 'MALE' | 'FEMALE';
	birthday?: string;
	isActive?: boolean;

	constructor(init?: Partial<ProfileModel>) {
		Object.assign(this, init);
	}
}
