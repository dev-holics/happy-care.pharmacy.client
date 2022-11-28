import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from 'src/app/pages/main/main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductHighlightComponent } from 'src/app/pages/product/components/product-highlight/product-highlight.component';
import { ProductBestsellerComponent } from 'src/app/pages/product/components/product-bestseller/product-bestseller.component';
import { ProductEndemicComponent } from 'src/app/pages/product/components/product-endemic/product-endemic.component';
import { CategoryHighlightComponent } from 'src/app/pages/category/component/category-highlight/category-highlight.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryFilterComponent } from 'src/app/pages/category/component/category-filter/category-filter.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductContentComponent } from 'src/app/pages/product/components/product-detail/product-content/product-content.component';
import { ProductDescriptionComponent } from 'src/app/pages/product/components/product-detail/product-description/product-description.component';

@NgModule({
	declarations: [
		MainComponent,
		HomeComponent,
		ProductEndemicComponent,
		ProductHighlightComponent,
		ProductBestsellerComponent,
		CategoryHighlightComponent,
		CategoryFilterComponent,
		ProductListComponent,
		ProductDetailComponent,
		ProductContentComponent,
		ProductDescriptionComponent,
	],
	imports: [
		CommonModule,
		MainRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule.forRoot(),
	],
	exports: [],
	providers: [],
})
export class MainModule {}
