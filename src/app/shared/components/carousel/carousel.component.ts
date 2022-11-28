import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
	advs: any[];

	ngOnInit(): void {
		this.advs = [
			{
				name: '1',
				url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/banner-102022/860-x-280.webp',
			},
			{
				name: '2',
				url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/banner-102022/860x280px-hisamitsu-led.webp',
			},
			{
				name: '3',
				url: 'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/banner-102022/860-x-280-01-2.webp',
			},
		];
	}
}
