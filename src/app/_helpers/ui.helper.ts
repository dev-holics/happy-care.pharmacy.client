import { BehaviorSubject, Subscription } from 'rxjs';

export class UiHelper {
	private static _uiBlockBehavior$ = new BehaviorSubject(false);

	public static block() {
		this._uiBlockBehavior$.next(true);
	}

	public static unBlock() {
		this._uiBlockBehavior$.next(false);
	}

	public static subscribeBlockUI(
		next?: (isBlock: boolean) => void,
		error?: (error: any) => void,
		complete?: () => void,
	): Subscription {
		return this._uiBlockBehavior$.subscribe({
			next,
			error,
			complete,
		});
	}
}
