import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomPrimengModule } from 'src/app/shared/primeng.module';
import { CustomMaterialModule } from 'src/app/shared/material.module';

const PROVIDERS: never[] = [];

const MODULE_SHARED = [CustomMaterialModule, CustomPrimengModule];

@NgModule({
	imports: [...MODULE_SHARED, CommonModule, FlexLayoutModule],
	exports: [...MODULE_SHARED],
	declarations: [],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [...PROVIDERS],
		};
	}
}
