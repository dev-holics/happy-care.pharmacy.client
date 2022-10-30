import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';

import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { PagesComponent } from './pages/pages.component';

import { AppSettings } from './app.settings';
import { BlockUiComponent } from 'src/app/shared/components/block-ui/block-ui.component';

@NgModule({
	declarations: [AppComponent, PagesComponent, BlockUiComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ToastModule,
		StoreModule.forRoot({}, {}),
		SharedModule.forRoot(),
	],
	providers: [
		AppSettings,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: OverlayContainer, useClass: CustomOverlayContainer },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
