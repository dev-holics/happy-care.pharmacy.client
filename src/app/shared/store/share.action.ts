import {createAction, props} from "@ngrx/store";
import {ENUM_SHARE_ACTION} from "src/app/_store/store.action.enum";
import {CityModel} from "src/app/shared/models/city.model";
import {DistrictModel} from "src/app/shared/models/district.model";
import {BranchModel} from "src/app/shared/models/branch.model";

export const updateShareData = createAction(
  ENUM_SHARE_ACTION.UPDATE_SHARE_DATA,
  props<{
    branches: BranchModel[],
    currentCity: CityModel;
    currentDistrict: DistrictModel;
    currentBranch?: BranchModel;
  }>(),
);
