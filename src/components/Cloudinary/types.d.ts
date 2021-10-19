type LatitudinalDirection = 'N' | 'S';
type LongitudinalDirection = 'E' | 'W';
export type Direction = 'N' | 'S' | 'E' | 'W';
export type Latitude = `${number} deg ${number}' ${number}" ${LatitudinalDirection}'`;
export type Longitude = `${number} deg ${number}' ${number}" ${LongitudinalDirection}'`;

export interface Context {
	custom: {
		caption?: string;
		alt?: string;
		GPSLatitude?: Latitude;
		GPSLongitude?: Longitude;
		height?: string;
		width?: string;
	};
}
export interface Resource {
	public_id: string;
	version: number;
	format: string;
	width: number;
	height: number;
	created_at: string;
	type: string;
	context?: Context;
}
export interface Photos {
	resources: Array<Resource>;
	updated_at: string;
}
