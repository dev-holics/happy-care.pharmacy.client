export interface CategoryModel {
	id: string;
	name: string;
	description: string;
	order: number;
	slug: string;
	children: CategoryModel[];
}
