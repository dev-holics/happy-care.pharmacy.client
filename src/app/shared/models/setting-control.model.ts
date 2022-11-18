export class SettingControlModel<T> {
	value: T | undefined;
	key: string;
	label: string;
	disabled: boolean;
	hidden: boolean;
	controlType: string;
	type: string;
	options: any[];
	optionLabel: string;
	optionValue: string;
	onChange?: (_event?: any) => void;
	validates: {
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		pattern?: RegExp;
		isDuplicate?: boolean;
		isPasswordMatch?: boolean;
	};

	constructor(
		options: {
			value?: T;
			key?: string;
			label?: string;
			disabled?: boolean;
			hidden?: boolean;
			onChange?: (_event?: any) => void;
			controlType?: string;
			type?: string;
			options?: any[];
			optionLabel?: string;
			optionValue?: string;
			validates?: {
				required?: boolean;
				minLength?: number;
				maxLength?: number;
				pattern?: RegExp;
				isDuplicate?: boolean;
				isPasswordMatch?: boolean;
			};
		} = {},
	) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.disabled = !!options.disabled;
		this.hidden = !!options.hidden;
		this.onChange = options.onChange;
		this.controlType = options.controlType || '';
		this.type = options.type || '';
		this.options = options.options || [];
		this.optionLabel = options.optionLabel || '';
		this.optionValue = options.optionValue || '';
		this.validates = options.validates || {};
	}
}
