import { IImage, ITag } from ".";
import { IUser } from "../../auth/types";

export interface IPost {
	id: number;
	title: string;
	content: string;

	author?: IUser;

	images?: IImage[];
	views?: IProfile[];
	likes?: IProfile[];
	tags?: ITag[];
	links?: ILink[];
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
