import React, { forwardRef, useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import * as exifr from 'exifr';

import sanityClient from 'part:@sanity/base/client';
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput';
import { withDocument } from 'part:@sanity/form-builder';

const client = sanityClient.withConfig({ apiVersion: '2022-05-31' });

const dragRootStyle = {
	height: '100px',
	border: '1px dashed #ccc',
	borderRadius: '5px',
	margin: '0.75rem 0',
	padding: '0.5rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};
const dragRootActiveStyle = {
	...dragRootStyle,
	border: '1px dashed #2196f3'
};

const GalleryUploadArray = withDocument(
	forwardRef((props, ref) => {
		// destructure props for easier use
		const { type, document, ...rest } = props;
		const { _id } = document;

		const [uploadProgress, setUploadProgress] = useState(null);
		const onDrop = useCallback(async (acceptedFiles) => {
			setUploadProgress(`0 / ${acceptedFiles.length}`);
			try {
				for (const [index, file] of acceptedFiles.entries()) {
					setUploadProgress(`${index} / ${acceptedFiles.length}`);

					const { filename, type: contentType } = file;
					const isImage = contentType === 'image/jpeg' || contentType === 'image/png';

					let data = { _type: 'galleryVideo', gridWidth: 1, gridHeight: 1 };
					if (isImage) {
						const blob = await file.arrayBuffer();
						const exif = await exifr.parse(blob, ['ImageDescription']);
						const description = exif?.ImageDescription;
						const asset = await client.assets.upload('image', blob, {
							contentType,
							filename,
							extract: ['blurhash', 'lqip', 'palette', 'exif', 'location']
						});
						data = {
							_type: 'galleryPhoto',
							gridWidth: 1,
							gridHeight: 1,
							photo: {
								asset: {
									_type: 'reference',
									_ref: asset._id
								}
							},
							description
						};
					}
					await client
						.patch(_id)
						.setIfMissing({ items: [] })
						.append('items', [data])
						.commit({ autoGenerateArrayKeys: true });
				}
			} catch (e) {
				console.error(e);
			} finally {
				setUploadProgress(null);
			}
		}, []);
		const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

		// remove inputComponent property to prevent infinite loop caused by
		// FormBuilderInput resolving to WrappedDefaultInput again and again.
		const { inputComponent: _, ...restOfType } = type;

		return (
			<>
				<FormBuilderInput type={restOfType} ref={ref} {...rest} />
				<div {...getRootProps()} style={isDragActive ? dragRootActiveStyle : dragRootStyle}>
					<input {...getInputProps()} disabled={uploadProgress !== null} />
					{uploadProgress !== null ? (
						<p>{uploadProgress}</p>
					) : (
						<p>Drag 'n' drop some files here, or click to select files</p>
					)}
				</div>
			</>
		);
	})
);

export default GalleryUploadArray;
