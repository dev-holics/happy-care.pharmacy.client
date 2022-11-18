import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { DynamicFormControlService } from 'src/app/shared/services/dynamic-form.service';
import { SettingControlModel } from '../../models/setting-control.model';

@Component({
	selector: 'dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	dynamicFormControlService = new DynamicFormControlService();

	constructor(private renderer: Renderer2) {}

	@Input() settingControl!: SettingControlModel<any>;
	@Input() settingControls!: SettingControlModel<any>[];
	@Input() formGroup!: FormGroup;
	@Input() isSubmit!: boolean;

	ngOnInit() {}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	handleEnterEventOfDynamicTextBox(
		dynamicTextBoxIndex: number,
		dynamicTextBoxLength: number,
		formArray: FormArray,
		settingControl: SettingControlModel<any>,
	) {
		if (dynamicTextBoxIndex + 1 === dynamicTextBoxLength) {
			this.addDynamicTextBox(formArray, settingControl);
		}
		const elementId = `#${settingControl.key}_${dynamicTextBoxIndex + 1}`;

		this.subscription.add(
			timer(0).subscribe(_ => {
				this.renderer.selectRootElement(elementId).focus();
			}),
		);
	}

	addDynamicTextBox(
		formArray: FormArray,
		settingControl: SettingControlModel<any>,
	) {
		const validators =
			this.dynamicFormControlService.getValidators(settingControl);
		formArray.push(new FormControl('', { validators }));
	}

	removeDynamicTextBox(formArray: FormArray, i: number) {
		formArray.removeAt(i);
	}

	getControls(controlName: any) {
		return (this.formGroup.get(controlName) as FormArray).controls;
	}

	trackByFn(index: any) {
		return index;
	}
}
