import { isEmpty } from 'radash';
import { createReducer, on } from '@ngrx/store';
import { CityModel } from 'src/app/shared/models/city.model';
import { DistrictModel } from 'src/app/shared/models/district.model';
import { BranchModel } from 'src/app/shared/models/branch.model';
import {
	loadShareDataFromLocalStorage,
	removeShareData,
	updateShareData,
} from 'src/app/shared/store/share.action';
import { LocalStorageHelper } from 'src/app/_helpers/local-storage.helper';

export interface State {
	branches: BranchModel[];
	currentCity?: CityModel;
	currentDistrict?: DistrictModel;
	currentBranch?: BranchModel;
}

const initialState: State = {
	branches: [],
};

export const shareReducer = createReducer(
	initialState,
	on(loadShareDataFromLocalStorage, (state, _action) => {
		const shareData = LocalStorageHelper.getShareState();

		if (isEmpty(shareData)) return state;

		return {
			...state,
			...shareData,
		};
	}),
	on(removeShareData, (state, _action) => {
		LocalStorageHelper.removeShareState();

		return {
			...initialState,
		};
	}),
	on(updateShareData, (state, action) => {
		if (isEmpty(action)) return state;

		LocalStorageHelper.setShareState(action);

		return {
			...state,
			...action,
		};
	}),
);
