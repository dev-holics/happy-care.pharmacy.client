import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SETTING_CONTROL_TYPE } from 'src/app/_config/enum.config';
import { SettingControlModel } from 'src/app/shared/models/setting-control.model';

@Injectable({ providedIn: 'root' })
export class DynamicFormControlService {
	getValidators(settingControl: SettingControlModel<any>) {
		const validators = [];

		if (settingControl.validates.required) {
			validators.push(Validators.required);
		}

		const { minLength } = settingControl.validates;

		if (minLength) {
			validators.push(Validators.minLength(minLength));
		}

		const { maxLength } = settingControl.validates;

		if (maxLength) {
			validators.push(Validators.maxLength(maxLength));
		}

		const { pattern } = settingControl.validates;

		if (pattern) {
			validators.push(Validators.pattern(pattern));
		}

		return validators;
	}

	getDefaultValue(settingControl: SettingControlModel<any>) {
		let defaultValue: any;
		switch (settingControl.controlType) {
			case SETTING_CONTROL_TYPE.DROPDOWN: {
				defaultValue = null;
				break;
			}
			case SETTING_CONTROL_TYPE.CHECKBOX_GROUP: {
				defaultValue = [];
				break;
			}
			default: {
				defaultValue = '';
				break;
			}
		}
		return defaultValue;
	}

	getFormGroup(settingControls: SettingControlModel<any>[]) {
		const group: any = {};
		settingControls.forEach(settingControl => {
			const validators = this.getValidators(settingControl);
			const defaultValue = this.getDefaultValue(settingControl);
			switch (settingControl.controlType) {
				case SETTING_CONTROL_TYPE.DYNAMIC_TEXT_BOX: {
					group[settingControl.key] = new FormArray(
						[],
						[Validators.required, Validators.maxLength(50)],
					);
					if (!settingControl.value.length) {
						group[settingControl.key].push(
							new FormControl(defaultValue, { validators }),
						);
						break;
					}
					settingControl.value.forEach((value: any) => {
						group[settingControl.key].push(
							new FormControl(value, { validators }),
						);
					});
					break;
				}
				default: {
					group[settingControl.key] = new FormControl(
						settingControl.value || defaultValue,
						{ validators },
					);
					break;
				}
			}
		});
		return new FormGroup(group);
	}

	getValidateMessage(
		formControl: FormControl,
		settingControl: SettingControlModel<any>,
		isSubmit: boolean,
	) {
		const messageArr: string[] = [];
		if (!isSubmit) {
			return messageArr;
		}
		if (formControl.invalid) {
			if (formControl.hasError('required')) {
				messageArr.push(`${settingControl.label} không được để trống`);
				return messageArr;
			}
			if (formControl.hasError('minlength')) {
				const minlength = formControl.errors?.minlength.requiredLength;
				messageArr.push(
					`${settingControl.label} phải chứa ít nhất ${minlength} ký tự`,
				);
			}
			if (formControl.hasError('maxlength')) {
				const maxlength = formControl.errors?.maxlength.requiredLength;
				messageArr.push(`${settingControl.label} vượt quá ${maxlength} ký tự`);
			}
			if (formControl.hasError('pattern')) {
				messageArr.push(`${settingControl.label} không hợp lệ`);
			}
		}
		if (
			settingControl.key === 'confirmPassword' &&
			!settingControl.validates.isPasswordMatch
		) {
			messageArr.push(`password_is_not_match`);
		}
		if (settingControl.validates.isDuplicate) {
			messageArr.push(`${settingControl.label}_already_exists`);
		}
		return messageArr;
	}

	getInputValue(
		settingControls: SettingControlModel<any>[],
		formGroup: FormGroup,
		item: any,
		exceptionFields: string[] = [],
	) {
		exceptionFields.push('confirmPassword');
		settingControls.forEach(settingControl => {
			const formControl = formGroup.get(`${settingControl.key}`);
			if (exceptionFields.includes(settingControl.key)) {
				delete item[`${settingControl.key}`];
				return item;
			}
			if (settingControl.validates?.required) {
				item[`${settingControl.key}`] = formControl?.value || '';
				return item;
			}
			switch (settingControl.controlType) {
				case SETTING_CONTROL_TYPE.TEXT_BOX: {
					item[`${settingControl.key}`] = formControl?.value || '';
					break;
				}
				default: {
					item[`${settingControl.key}`] = formControl?.value || '';
					break;
				}
			}
			return item;
		});
	}

	validatePasswordMatch(
		formGroup: FormGroup,
		settingControls: SettingControlModel<any>[],
	) {
		const settingControl = this.getSettingControl(
			settingControls,
			'confirmPassword',
		);

		if (settingControl) {
			settingControl.validates.isPasswordMatch =
				this.getFormControl(formGroup, 'password')?.value ===
				this.getFormControl(formGroup, 'confirmPassword')?.value;
		}
	}

	getSettingControl(
		settingControls: SettingControlModel<any>[],
		settingControlName: string,
	) {
		return settingControls.find(element => element.key === settingControlName);
	}

	getFormControl(formGroup: FormGroup, settingControlName: string) {
		return formGroup.get(settingControlName);
	}

	validateScroll(
		settingControls: SettingControlModel<any>[],
		hasValidateScroll: boolean,
	) {
		settingControls.forEach(settingControl => {
			if (hasValidateScroll) {
				return;
			}
			const element = document.getElementById(
				`${settingControl.key}_validate_message`,
			);
			if (element) {
				element.scrollIntoView({ block: 'center' });
				hasValidateScroll = true;
			}
		});
	}

	checkValidate(
		formGroup: FormGroup,
		settingControls: SettingControlModel<any>[],
	) {
		if (!this.getSettingControl(settingControls, 'confirmPassword')) {
			return formGroup.valid;
		}
		return (
			formGroup.valid &&
			this.getSettingControl(settingControls, 'confirmPassword')?.validates
				.isPasswordMatch
		);
	}
}
