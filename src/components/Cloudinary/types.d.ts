export interface Resource {
	public_id: string;
	version: number;
	format: string;
	width: number;
	height: number;
	created_at: string;
	type: string;
}
export interface Photos {
	resources: Array<Resource>;
	updated_at: string;
}
