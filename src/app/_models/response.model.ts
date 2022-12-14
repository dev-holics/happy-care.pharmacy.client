export interface ResponseModel<T> {
	data: T | null;
	success: boolean;
}

export interface PaginationResponseModel<T> {
  data: T | null;
  totalData: number;
  success: boolean;
}

export interface BasicResponseModel {
	success: boolean;
}
