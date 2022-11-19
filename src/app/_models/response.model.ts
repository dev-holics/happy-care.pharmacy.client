export interface ResponseModel<T> {
	data: T;
	success: boolean;
}

export interface BasicResponseModel {
	success: boolean;
}
