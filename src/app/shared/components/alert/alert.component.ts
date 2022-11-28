import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
	private _displayAlert: boolean = true;

	@Input()
	get displayAlert(): boolean {
		return this._displayAlert;
	}
	set displayAlert(value: boolean) {
		this._displayAlert = value;
	}

	@Input() isDisabled: boolean = false;
	@Input() text: string;
	@Input() textButton: string;
	@Input() textCancelButton: string;
	@Input() type: string = '';
	@Output() displayAlertChange: EventEmitter<boolean> =
		new EventEmitter<boolean>();
	@Output() submit: EventEmitter<any> = new EventEmitter<any>();
	@Output() close: EventEmitter<any> = new EventEmitter<any>();

	ngOnInit() {}

	hideModal() {
		this.displayAlert = false;
		this.close.emit(this.displayAlert);
	}

	submitModal() {
		this.displayAlert = false;
		this.submit.emit(this.displayAlert);
	}
}
