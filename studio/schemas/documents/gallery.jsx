import React from 'react';

import { FaPhotoVideo } from 'react-icons/fa';

import GalleryUploadArray from '../../components/GalleryUploadArray';

const baseGalleryItemFields = [
	{
		name: 'gridWidth',
		title: 'Grid Width',
		type: 'number',
		validation: (Rule) => Rule.required().integer().positive().max(3),
		initialValue: 1
	},
	{
		name: 'gridHeight',
		title: 'Grid Height',
		type: 'number',
		validation: (Rule) => Rule.required().integer().positive().max(3),
		initialValue: 1
	}
];

const galleryVideo = {
	name: 'galleryVideo',
	title: 'Gallery Video',
	type: 'object',
	fields: [
		...baseGalleryItemFields,
		{
			name: 'description',
			title: 'Description',
			type: 'text'
		},
		{
			name: 'location',
			title: 'Location',
			type: 'geopoint'
		},
		{
			name: 'video',
			title: 'Video',
			type: 'mux.video',
			validation: (Rule) => Rule.required()
		}
	],
	preview: {
		select: {
			playbackId: 'video.asset.playbackId',
			description: 'description',
			width: 'gridWidth',
			height: 'gridHeight'
		},
		prepare: ({ playbackId, description, width, height }) => {
			const url = `https://image.mux.com/${playbackId}/animated.gif`;
			return {
				title: description ?? '',
				subtitle: `${width}x${height} video`,
				media: <img src={url} style={{ objectFit: 'cover' }} />
			};
		}
	}
};

const galleryPhoto = {
	name: 'galleryPhoto',
	title: 'Gallery Photo',
	type: 'object',
	fields: [
		...baseGalleryItemFields,
		{
			name: 'description',
			title: 'Description',
			type: 'text'
		},
		{
			name: 'photo',
			title: 'Photo',
			type: 'image',
			validation: (Rule) => Rule.required(),
			options: {
				hotspot: true,
				metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location']
			}
		}
	],
	preview: {
		select: {
			url: 'photo.asset.url',
			description: 'description',
			width: 'gridWidth',
			height: 'gridHeight'
		},
		prepare: ({ url, description, width, height }) => {
			return {
				title: description ?? '',
				subtitle: `${width}x${height} photo`,
				media: <img src={url} style={{ objectFit: 'cover' }} />
			};
		}
	}
};

const galleryTitle = {
	name: 'galleryTitle',
	title: 'Gallery Title',
	type: 'object',
	fields: [
		...baseGalleryItemFields,
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}
	],
	preview: {
		select: {
			title: 'title',
			width: 'gridWidth',
			height: 'gridHeight'
		},
		prepare: ({ title, width, height }) => {
			return {
				title,
				subtitle: `${width}x${height} title`
			};
		}
	}
};

const gallery = {
	name: 'gallery',
	type: 'document',
	title: 'Gallery',
	icon: FaPhotoVideo,
	preview: {
		select: {
			title: 'title',
			startDate: 'startDate',
			featuredPhoto: 'featuredPhoto'
		},
		prepare: ({ title, startDate, featuredPhoto }) => {
			return {
				title,
				subtitle: startDate,
				media: featuredPhoto
			};
		}
	},
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			options: {
				source: 'title',
				maxLength: 96
			},
			validation: (Rule) => Rule.required()
		},
		{
			name: 'startDate',
			title: 'Start Date',
			type: 'date',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'endDate',
			title: 'End Date',
			type: 'date',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'featuredPhoto',
			title: 'Featured Photo',
			type: 'image',
			options: {
				hotspot: true,
				metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location']
			},
			validation: (Rule) => Rule.required()
		},
		{
			name: 'items',
			title: 'Items',
			type: 'array',
			components: {
				input:GalleryUploadArray
			},
			of: [galleryVideo, galleryPhoto, galleryTitle]
		}
	]
};

export default gallery;
