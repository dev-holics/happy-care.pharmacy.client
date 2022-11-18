import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomPrimengModule } from 'src/app/shared/primeng.module';
import { CustomMaterialModule } from 'src/app/shared/material.module';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { VietnameseCurrencyPipe } from 'src/app/shared/pipe/vn-currency.pipe';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

const PROVIDERS: never[] = [];

const MODULE_SHARED = [
	CustomMaterialModule,
	CustomPrimengModule,
	NgDynamicBreadcrumbModule,
	ReactiveFormsModule,
	PasswordModule,
];

@NgModule({
	declarations: [
		VietnameseCurrencyPipe,
		LayoutComponent,
		FooterComponent,
		HeaderComponent,
		CarouselComponent,
		AlertComponent,
		DynamicFormComponent,
	],
	imports: [...MODULE_SHARED, CommonModule, FlexLayoutModule],
	exports: [
		...MODULE_SHARED,
		VietnameseCurrencyPipe,
		LayoutComponent,
		FooterComponent,
		HeaderComponent,
		CarouselComponent,
		AlertComponent,
		DynamicFormComponent,
	],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [...PROVIDERS],
		};
	}
}
