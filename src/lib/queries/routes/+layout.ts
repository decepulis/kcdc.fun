import imageSnippet, { type ReferencedSanityImageObject } from '$lib/queries/snippets/image';

const query = /* groq */ `
  *[_type == "gallery"] {
    _id,
    slug,
    title,
    featuredPhoto ${imageSnippet}
  }
`;

export interface GalleryListDocument {
	_id: string;
	slug: { current: string };
	title: string;
	featuredPhoto: ReferencedSanityImageObject;
}

export default query;
