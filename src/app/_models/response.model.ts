export interface ResponseModel<T> {
	data: T | null;
	success: boolean;
}

export interface BasicResponseModel {
	success: boolean;
}
