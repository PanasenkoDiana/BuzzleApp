export interface IUser {
    username: string,
    name: string | null,
    surname: string | null,
    profileImage: string | null
}

export interface IFriendRequest {
    fromId: number,
    toId: number,
    status: FriendRequestStatus
}

export type ICanceledRequest = { status: "canceled" }

enum FriendRequestStatus {
    "accepted",
    "pending"
}

export interface IMyRequest extends IFriendRequest {
    to: IUser
}

export interface IRequest extends IFriendRequest {
    from: IUser
}