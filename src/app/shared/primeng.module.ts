import { NgModule, ModuleWithProviders } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ChipsModule } from 'primeng/chips';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TabMenuModule } from 'primeng/tabmenu';
import { CalendarModule } from 'primeng/calendar';
import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';
import { LightboxModule } from 'primeng/lightbox';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DragDropModule } from 'primeng/dragdrop';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { GalleriaModule } from 'primeng/galleria';
import { BlockUIModule } from 'primeng/blockui';
import { OrderListModule } from 'primeng/orderlist';

const MODULE_SHARED = [
	CheckboxModule,
	ScrollPanelModule,
	DialogModule,
	DropdownModule,
	MultiSelectModule,
	PaginatorModule,
	ToastModule,
	TooltipModule,
	RadioButtonModule,
	AutoCompleteModule,
	TableModule,
	ChipsModule,
	TabViewModule,
	InputTextareaModule,
	ProgressBarModule,
	ProgressSpinnerModule,
	SliderModule,
	TabMenuModule,
	CalendarModule,
	TreeTableModule,
	AccordionModule,
	LightboxModule,
	CodeHighlighterModule,
	InputSwitchModule,
	DragDropModule,
	CarouselModule,
	SelectButtonModule,
	CardModule,
	OverlayPanelModule,
	InputNumberModule,
	MenuModule,
	BreadcrumbModule,
	TieredMenuModule,
	BadgeModule,
	TagModule,
	ButtonModule,
	PanelModule,
	PanelMenuModule,
	GalleriaModule,
	BlockUIModule,
	OrderListModule,
];

@NgModule({
	imports: [...MODULE_SHARED],
	exports: [...MODULE_SHARED],
	providers: [MessageService],
})
export class CustomPrimengModule {
	static forRoot(): ModuleWithProviders<CustomPrimengModule> {
		return {
			ngModule: CustomPrimengModule,
		};
	}
}
