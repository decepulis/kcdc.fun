import { error } from '@sveltejs/kit';
import { dev } from '$app/env';

import { client, overlayDrafts } from '$lib/sanity/server';
import query, { type GalleryDocument } from '$lib/queries/routes/photos/[gallery]';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { gallery } }) => {
	const response = await client.fetch<GalleryDocument[]>(query, { gallery });
	const documents = overlayDrafts(response, dev);

	if (documents.length > 0) {
		const document = documents[0];
		return {
			title: document.title,
			items: document.items
		};
	}

	throw error(404, 'Not found');
};
