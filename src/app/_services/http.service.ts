import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP_OPTIONS } from 'src/app/_config';
import { ErrorHandlerHelper } from 'src/app/_helpers/error-handler.helper';
import { UiHelper } from 'src/app/_helpers/ui.helper';
import { firstValueFrom, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerHelper,
	) {}

	createAuthorizationHeader() {
		const headers = {
			'Content-Type': 'application/json',
		};

		return new HttpHeaders(headers);
	}

	initOption(options = {}) {
		return {
			...options,
			headers: this.createAuthorizationHeader(),
			// withCredentials: true,
			timeout: HTTP_OPTIONS.Timeout,
		};
	}

	async get(url: string, isBlocked: boolean = true): Promise<any> {
		if (isBlocked) UiHelper.block();

		return firstValueFrom(this.http.get(url, this.initOption()))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	async post(
		url: string,
		body: any = null,
		isBlocked: boolean = true,
	): Promise<any> {
		if (isBlocked) UiHelper.block();

		return firstValueFrom(this.http.post(url, body, this.initOption()))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	async put(
		url: string,
		body: any = null,
		isBlocked: boolean = true,
	): Promise<any> {
		if (isBlocked) UiHelper.block();
		return firstValueFrom(this.http.put(url, body, this.initOption()))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	async delete(
		url: string,
		body: any = null,
		isBlocked: boolean = true,
	): Promise<any> {
		if (isBlocked) UiHelper.block();
		return firstValueFrom(this.http.delete(url, this.initOption({ body })))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	handleError(err: any) {
		if (
			err instanceof HttpErrorResponse &&
			err.status != HttpStatusCode.Unauthorized
		) {
			return err.error;
		}
		this.errorHandler.handleError(err);
	}
}
