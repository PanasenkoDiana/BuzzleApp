import { IImage, ITag } from "."
import { IUser } from "../../auth/types"

export interface IPost {
    id: number
    name: string
    topic?: string
    text?: string
    tags?: ITag[]
    link?: string
    images?: IImage[],
    author: IUser
}

export interface ICreatePost {
	title: string;
	content: string;
	tags?: (string | ITag)[];
	images: string[]; 
}

export interface IPostForm extends ICreatePost {
	id?: number;
}