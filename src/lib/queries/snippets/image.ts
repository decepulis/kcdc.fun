export default /* groq */ `{
  asset -> {
    // _createdAt, // '2022-05-31T14:31:24Z',
    _id, // 'image-14bff489b8bdd28710a223b4e359f1a60a436de0-1920x1440-jpg',
    // _rev, // 'GHtxEadGyxLmjw7CwUkyoT',
    // _type, // 'sanity.imageAsset',
    // _updatedAt, // '2022-05-31T14:31:24Z',
    assetId, // '14bff489b8bdd28710a223b4e359f1a60a436de0',
    // extension, // 'jpg',
    metadata { 
      dimensions,
      exif {
        DateTimeDigitized,
        DateTimeOriginal,
        FNumber,
        FocalLength,
        ISO,
        LensMake,
        LensModel,
        ShutterSpeedValue
      },
      // hasAlpha,
      // isOpaque,
      location,
      // blurHash,
      // lqip,
      palette
     }, // [Object],
    // mimeType, // 'image/jpeg',
    // originalFilename, // '14bff489b8bdd28710a223b4e359f1a60a436de0-1920x1440.jpg',
    // path, // 'images/m6tfkaqi/production/14bff489b8bdd28710a223b4e359f1a60a436de0-1920x1440.jpg',
    // sha1hash, // '14bff489b8bdd28710a223b4e359f1a60a436de0',
    // size, // 1546796,
    // uploadId, // 'aElM2e61qzEDXR8LGd4xN2tpVb5dczLe',
    url, // 'https://cdn.sanity.io/images/m6tfkaqi/production/14bff489b8bdd28710a223b4e359f1a60a436de0-1920x1440.jpg'
  }
}`;

interface Dimensions {
	aspectRatio: number;
	height: number;
	width: number;
}
interface Exif {
	DateTimeDigitized: string | null;
	DateTimeOriginal: string | null;
	FNumber: number | null;
	FocalLength: number | null;
	ISO: number | null;
	LensMake: string | null;
	LensModel: string | null;
	ShutterSpeedValue: number | null;
}
interface Geopoint {
	latitude: number | null;
	longitude: number | null;
	altitude: number | null;
}
interface PaletteSwatch {
	background: string;
	foreground: string;
	population: number;
	title: string;
}
interface Palette {
	darkMuted: PaletteSwatch;
	darkVibrant: PaletteSwatch;
	dominant: PaletteSwatch;
	lightMuted: PaletteSwatch;
	lightVibrant: PaletteSwatch;
	muted: PaletteSwatch;
	vibrant: PaletteSwatch;
}
interface Metadata {
	dimensions: Dimensions;
	exif: Exif;
	location: Geopoint | null;
	palette: Palette;
}
interface Asset {
	_id: string;
	assetId: string;
	metadata: Metadata;
	url: string;
}
export interface ReferencedSanityImageObject {
	asset: Asset;
}
