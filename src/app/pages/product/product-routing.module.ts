import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductComponent } from 'src/app/pages/product/components/product/product.component';

const routes: Routes = [
	{
		path: '',
		component: ProductComponent,
		children: [{ path: '', pathMatch: 'full', redirectTo: 'trang-chu' }],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductRoutingModule {}
