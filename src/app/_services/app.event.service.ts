import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EVENT_KEY } from 'src/app/_config';

@Injectable({ providedIn: 'root' })
export class AppEventService {
	private static _authBehavior$ = new BehaviorSubject('');

	public static logout() {
		this._authBehavior$.next(EVENT_KEY.LOGOUT);
	}

	public static subscribeAuthEvent(
		next?: (eventName: string) => void,
		error?: (error: any) => void,
		complete?: () => void,
	): Subscription {
		return this._authBehavior$.subscribe({
			next,
			error,
			complete,
		});
	}
}
