import { IImage, ITag } from ".";
import { IAlbum } from "../../albums/types";
import { IUser } from "../../auth/types";

export interface IPost {
	id: number;
	title: string;
	content?: string;

	author: IUser;

	tags?: ITag[];
	images?: IImage[];
	links?: ILink[];

	views?: IProfile[];
	likes?: IProfile[];
}

export interface ICreatePost {
	title: string;
	content?: string;
	topic?: string;
	tags?: ITag[];
	links?: string[];
	images?: string[];
}

export interface IPostForm
	extends Omit<ICreatePost, "tags" | "images" | "links"> {
	id: number;
	tags?: [];
	images?: string[];
	links?: string[];
}

export interface ILink {
	id: number;
	url: string;

	postId: number;
	post?: IPost;
}

export interface IProfile {
	id: number;
	user_id: number;
	date_of_birth: Date;
	signature?: string | null;

	avatars?: IAvatar[];
	posts_viewed?: IPost[];
	posts_liked?: IPost[];
}

export interface IAvatar {
	id: number;
	imageId: number;
	image?: IImage;
	profile_id: number;
	profile?: IProfile;
	active: boolean;
	shown: boolean;
}
