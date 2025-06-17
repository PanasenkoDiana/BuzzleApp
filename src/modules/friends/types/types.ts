export interface IUser {
	username: string;
	name: string | null;
	surname: string | null;
	profileImage: string | null;
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
