import { createAction, props } from '@ngrx/store';
import { ENUM_SHARE_ACTION } from 'src/app/_store/store.action.enum';
import { CityModel } from 'src/app/shared/models/city.model';
import { DistrictModel } from 'src/app/shared/models/district.model';
import { BranchModel } from 'src/app/shared/models/branch.model';

export const loadShareDataFromLocalStorage = createAction(
	ENUM_SHARE_ACTION.LOAD_SHARE_DATA_FROM_LOCAL_STORAGE,
);

export const removeShareData = createAction(
	ENUM_SHARE_ACTION.REMOVE_SHARE_DATA,
);

export const updateShareData = createAction(
	ENUM_SHARE_ACTION.UPDATE_SHARE_DATA,
	props<{
		branches: BranchModel[];
		currentCity: CityModel;
		currentDistrict: DistrictModel;
		currentBranch?: BranchModel;
	}>(),
);
