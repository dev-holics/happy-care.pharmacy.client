import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MainRoutingModule } from 'src/app/pages/main/main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { ProductHighlightComponent } from 'src/app/pages/product/components/product-highlight/product-highlight.component';
import { ProductBestsellerComponent } from 'src/app/pages/product/components/product-bestseller/product-bestseller.component';
import { ProductEndemicComponent } from 'src/app/pages/product/components/product-endemic/product-endemic.component';
import { CategoryHighlightComponent } from 'src/app/pages/category/component/category-highlight/category-highlight.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
	declarations: [
		MainComponent,
		HeaderComponent,
		CarouselComponent,
		ProductEndemicComponent,
		ProductHighlightComponent,
		ProductBestsellerComponent,
		CategoryHighlightComponent,
  HomeComponent,
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
