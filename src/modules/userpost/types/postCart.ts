import { IImage, ITag } from "."
import { IUser } from "../../auth/types"

export interface IPost {
	id: number;
	title: string;
	content: string;
	authorId: number;
	author: IUser;
	tags: ITag[];
	images: IImage[];
}
export interface ICreatePost {
	title: string;
	content: string;
	tags?: (string | ITag)[];
	images: IImage[]; 
}

export interface IPostForm extends ICreatePost {
	id?: number;
}