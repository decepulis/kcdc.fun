interface BaseOptions {
	cloudName: string;
	publicId: string;
}

interface SizeOptions extends BaseOptions {
	width: number;
	height: number;
}

export const gallerySrc = ({ cloudName, publicId, width, height }: SizeOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill/q_auto/f_auto/${publicId}`;
export const gallerySrcset = ({ cloudName, publicId, width, height }: SizeOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill,dpr_1.0/q_auto/f_auto/${publicId} 1x,` +
	`https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill,dpr_2.0/q_auto/f_auto/${publicId} 2x`;

export const placeholderSrc = ({ cloudName, publicId }: BaseOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/b_auto:predominant,c_pad,w_iw_div_2,ar_1/c_fill,g_south_east,w_1,h_1/q_auto/f_auto/${publicId}`;
export const fullSizeSrc = ({ cloudName, publicId }: BaseOptions): string =>
	`https://res.cloudinary.com/${cloudName}/image/upload/q_auto/f_auto/${publicId}`;
