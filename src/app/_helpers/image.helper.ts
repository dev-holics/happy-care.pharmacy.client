import { ImageModel } from 'src/app/shared/models/image.model';
import { isEmpty } from 'radash';

export class ImageHelper {
	static getListUrlFromImages(
		images: ImageModel[] | undefined,
	): string[] | undefined {
		if (!images || isEmpty(images)) return;

		return images.map(img => img.url);
	}
}
