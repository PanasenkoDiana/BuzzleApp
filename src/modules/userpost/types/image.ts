import { IPost } from ".";
import { IUser } from "../../auth/types";
import { IAvatar } from "./post";

export interface IImage {
	id: number;
	filename: string;
	file: string;
	uploadedAt: Date;

	avatar?: IAvatar | null;

	userId?: number | null;
	user?: IUser | null;

	postId?: number | null;
	post?: IPost | null;
}
