import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const phoneNumberRegexp = /[- +()0-9]{10,14}/g;
		const validPhoneNumber = phoneNumberRegexp.test(control.value);
		return control.value && !validPhoneNumber
			? { invalidphoneNumber: { value: control.value } }
			: null;
	};
}

export function passwordValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const passwordRegexp =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
		const validPassword = passwordRegexp.test(control.value);
		return control.value && !validPassword
			? { invalidPassword: { value: control.value } }
			: null;
	};
}
