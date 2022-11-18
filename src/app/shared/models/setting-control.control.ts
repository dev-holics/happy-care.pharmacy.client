import { SETTING_CONTROL_TYPE } from 'src/app/_config/enum.config';
import { SettingControlModel } from './setting-control.model';

export class TextboxControl extends SettingControlModel<string> {
	override controlType = SETTING_CONTROL_TYPE.TEXT_BOX;
}

export class TextareaControl extends SettingControlModel<string> {
	override controlType = SETTING_CONTROL_TYPE.TEXT_AREA;
}

export class DynamicTextBoxControl extends SettingControlModel<string[]> {
	override controlType = SETTING_CONTROL_TYPE.DYNAMIC_TEXT_BOX;
}

export class DropdownControl extends SettingControlModel<string> {
	override controlType = SETTING_CONTROL_TYPE.DROPDOWN;
}

export class CheckboxGroupControl extends SettingControlModel<string[]> {
	override controlType = SETTING_CONTROL_TYPE.CHECKBOX_GROUP;
}

export class PasswordControl extends SettingControlModel<string> {
	override controlType = SETTING_CONTROL_TYPE.PASSWORD;
}

export class CheckboxControl extends SettingControlModel<boolean> {
	override controlType = SETTING_CONTROL_TYPE.CHECKBOX;
}

export class RadioButtonGroupControl extends SettingControlModel<string> {
	override controlType = SETTING_CONTROL_TYPE.RADIO_BUTTON_GROUP;
}
