export interface IImage {
	id: number;
	filename: string;
	file: string;
	uploadedAt?: string;
	userId?: number | null;
}