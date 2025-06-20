import { IAlbum } from "../../albums/types"
import { Profile } from "../../auth/types"
import { IImage } from "../../userpost/types"
import { IProfile } from "../../userpost/types/post"

export interface IUser{
    username: string
    name: string
    surname: string
    Profile: Profile
}

export interface IFriendRequest {
	fromId: number;
	toId: number;
	status: false;
}

export type ICanceledRequest = { status: false };

export type IDeletedRequest = { status: false };

export interface IRequest {
	status: false;
	from: IUser;
}

export interface IMyRequest {
	status: false;
	to: IUser;
}
