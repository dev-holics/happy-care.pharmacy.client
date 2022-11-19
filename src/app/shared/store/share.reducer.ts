import { CityModel } from 'src/app/shared/models/city.model';
import { DistrictModel } from 'src/app/shared/models/district.model';

export interface State {
	cities: CityModel[];
	districts: DistrictModel[];
}

const initialState: State = {
	cities: [],
	districts: [],
};
