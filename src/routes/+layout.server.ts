import { error } from '@sveltejs/kit';

import { client, overlayDrafts } from '$lib/sanity/server';
import query, { type GalleryListDocument } from '$lib/queries/routes/+layout';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const response = await client.fetch<GalleryListDocument[]>(query);
	const data = overlayDrafts(response, false);

	if (data.length > 0) {
		return {
			galleries: data
		};
	}

	throw error(404, 'Not found');
};

export const prerender = true;
