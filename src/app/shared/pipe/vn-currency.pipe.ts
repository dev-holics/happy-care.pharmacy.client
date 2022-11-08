import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'VNCurrency' })
export class VietnameseCurrencyPipe implements PipeTransform {
	transform(value: number): string {
		let valueStr = String(value);

		if (!valueStr) return '0 VND';

		let commaIndex = valueStr.length - 3;

		while (commaIndex > 0) {
			valueStr =
				valueStr.substring(0, commaIndex) +
				',' +
				valueStr.substring(commaIndex);
			commaIndex -= 3;
		}

		return `${valueStr} VNĐ`;
	}
}
