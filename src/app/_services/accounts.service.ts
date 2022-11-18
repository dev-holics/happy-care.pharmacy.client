import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserToken, UserLogin, UserSignUp } from 'src/app/_models/user';
import { URL_CONFIG } from 'src/app/_config';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';

@Injectable({
	providedIn: 'root',
})
export class AccountsService {
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	private currentUser = new BehaviorSubject<UserToken | null>(null);

	currentUser$ = this.currentUser.asObservable();

	constructor(private httpClient: HttpClient) {}

	login(userLogin: UserLogin): Observable<any> {
		return this.httpClient
			.post<any>(`${URL_CONFIG.USER_URL}/login`, userLogin, this.httpOptions)
			.pipe(
				map((response: any) => {
					const { data } = response;
					if (data) {
						LocalStorageHelper.setCurrentUser(data);
						LocalStorageHelper.init(data);
						this.currentUser.next(data);
						return data;
					}
				}),
			);
	}

	signUp(signUpData: UserSignUp): Observable<any> {
		return this.httpClient
			.post<any>(
				`${URL_CONFIG.USER_PUBLICT_URL}/sign-up`,
				signUpData,
				this.httpOptions,
			)
			.pipe(
				map((response: any) => {
					if (response.statusCode === HttpStatusCode.Created) return true;
					throw new Error('Sign up failed');
				}),
			);
	}

	public get currentUserValue() {
		return this.currentUser.value;
	}

	logout() {
		LocalStorageHelper.removeAll();
		this.currentUser.next(null);
	}

	refreshToken() {
		const currentUser = LocalStorageHelper.getCurrentUser();
		if (currentUser) {
			const user = currentUser;
			if (user) {
				this.currentUser.next(user);
				return;
			}
		}
	}
}
