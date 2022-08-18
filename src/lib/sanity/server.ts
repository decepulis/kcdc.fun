import { dev } from '$app/env';
import sanityClient from '@sanity/client';

import { api } from '../../../studio/sanity.json';
const { projectId, dataset } = api;

export const client = sanityClient({
	projectId,
	dataset,
	apiVersion: '2022-05-31',
	useCdn: !dev
});

interface Document {
	_id: string;
}
export function overlayDrafts<T extends Document>(docs: Array<T>, preview: boolean) {
	const overlayed = docs.reduce((map, doc) => {
		if (!doc._id) {
			throw new Error('Ensure that `_id` is included in query projection');
		}

		const isDraft = doc._id.startsWith('drafts.');
		const id = isDraft ? doc._id.slice(7) : doc._id;
		if (preview) {
			if (isDraft) {
				// in preview mode, we always use a draft
				return map.set(id, doc);
			}
			// and use a published version only if we have to
			return !map.has(id) ? map.set(id, doc) : map;
		}
		// in standard mode, the inverse is true
		// we never use the draft
		return isDraft ? map : map.set(id, doc);
	}, new Map());

	return Array.from(overlayed.values()) as T[];
}
