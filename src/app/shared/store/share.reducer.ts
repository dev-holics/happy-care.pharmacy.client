import {createReducer, on} from "@ngrx/store";
import { CityModel } from 'src/app/shared/models/city.model';
import { DistrictModel } from 'src/app/shared/models/district.model';
import {BranchModel} from "src/app/shared/models/branch.model";
import {updateShareData} from "src/app/shared/store/share.action";

export interface State {
  branches: BranchModel[],
	currentCity?: CityModel;
	currentDistrict?: DistrictModel;
  currentBranch?: BranchModel;
}

const initialState: State = {
  branches: [],
};

export const shareReducer = createReducer(
  initialState,
  on(updateShareData, (state, action) => {
    return {
      ...state,
      ...action,
    };
  }),
);
