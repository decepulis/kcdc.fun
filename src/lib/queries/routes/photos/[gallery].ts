import imageSnippet, { type ReferencedSanityImageObject } from '$lib/queries/snippets/image';
import videoSnippet, { type ReferencedMuxVideoObject } from '$lib/queries/snippets/mux.video';

const query = /* groq */ `
  *[_type == "gallery" && slug.current == $gallery] {
    _id,
    slug,
    title,
    items[] {
      _key,
      _type,
      gridWidth,
      gridHeight,
      _type == 'galleryPhoto' => {
        description,
        photo ${imageSnippet}
      },
      _type == 'galleryVideo' => {
        description,
        location,
        video ${videoSnippet}
      },
      _type == 'galleryTitle' => {
        title
      }
    },
  }
`;

interface Geopoint {
	latitude: number | null;
	longitude: number | null;
	altitude: number | null;
}
interface BaseGalleryItem {
	_key: string;
	_type: 'galleryPhoto' | 'galleryVideo' | 'galleryTitle';
	gridWidth: number;
	gridHeight: number;
}
interface GalleryPhoto extends BaseGalleryItem {
	_type: 'galleryPhoto';
	description: string | null;
	photo: ReferencedSanityImageObject;
}
interface GalleryVideo extends BaseGalleryItem {
	_type: 'galleryVideo';
	description: string | null;
	location: Geopoint;
	video: ReferencedMuxVideoObject;
}
interface GalleryTitle extends BaseGalleryItem {
	_type: 'galleryTitle';
	title: string;
}
export type GalleryItem = GalleryPhoto | GalleryVideo | GalleryTitle;
export const isGalleryPhoto = (item: GalleryItem): item is GalleryPhoto =>
	item._type === 'galleryPhoto';
export const isGalleryVideo = (item: GalleryItem): item is GalleryVideo =>
	item._type === 'galleryVideo';
export const isGalleryTitle = (item: GalleryItem): item is GalleryTitle =>
	item._type === 'galleryTitle';

export interface GalleryDocument {
	_id: string;
	slug: { current: string };
	title: string;
	items: GalleryItem[];
}

export default query;
