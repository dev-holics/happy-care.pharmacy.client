export class ReceiverModel {
	id?: string;
	name: string;
	phoneNumber: string;
	city: string;
	district: string;
	address: string;
	note: string;

	constructor(init?: Partial<ReceiverModel>) {
		Object.assign(this, init);
	}
}
