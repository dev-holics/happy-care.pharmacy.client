import { CityModel } from 'src/app/_models/city.model';
import { DistrictModel } from 'src/app/_models/district.model';

export interface State {
	cities: CityModel[];
	districts: DistrictModel[];
}

const initialState: State = {
	cities: [],
	districts: [],
};
