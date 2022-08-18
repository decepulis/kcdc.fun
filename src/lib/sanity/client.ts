import imageUrlBuilder from '@sanity/image-url';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

import { api } from '../../../studio/sanity.json';
const { projectId, dataset } = api;

const builder = imageUrlBuilder({
	projectId,
	dataset
});

export const urlFor = (asset: SanityAsset) => builder.image(asset);
