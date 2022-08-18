export default /* groq */ `{
  asset->{
    assetId,
		playbackId,
		thumbTime,
		aspectRatio
  }
}`;

export interface ReferencedMuxVideoObject {
	asset: {
		assetId: string;
		playbackId: string;
		thumbTime: number | null;
		aspectRatio: `${string}:${string}`;
	};
}
