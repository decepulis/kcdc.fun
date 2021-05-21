interface BaseOptions {
	cloudName: string;
	publicId: string;
}

interface SizeOptions extends BaseOptions {
	width: number;
	height: number;
}

export const galleryFeatureUrl = ({ cloudName, publicId, width, height }: SizeOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill/q_auto/f_auto/${publicId}`;
export const galleryStandardUrl = ({ cloudName, publicId, width, height }: SizeOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill/q_auto/f_auto/${publicId}`;
export const placeholderUrl = ({ cloudName, publicId }: BaseOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/b_auto:predominant,c_pad,w_iw_div_2,ar_1/c_fill,g_south_east,w_1,h_1/q_auto/f_auto/${publicId}`;
export const fullSizeUrl = ({ cloudName, publicId }: BaseOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/q_auto/f_auto/${publicId}`;
