import imageSnippet, { type ReferencedSanityImageObject } from '$lib/queries/snippets/image';

const query = /* groq */ `
  *[_type == "gallery"] | order(startDate desc) {
    _id,
    slug,
    title,
    startDate,
    featuredPhoto ${imageSnippet}
  }
`;

export interface GalleryListDocument {
	_id: string;
	slug: { current: string };
  title: string;
  startDate: string;
	featuredPhoto: ReferencedSanityImageObject;
}

export default query;
