import { IImage, ITag } from "."
import { IUser } from "../../auth/types"

export interface IPostCart {
    id: number
    name: string
    topic?: string
    text?: string
    tags?: ITag[]
    link?: string
    images?: IImage[]
}

export interface IPostCartForm extends Omit<IPostCart, 'tags'> {
    tags?: string[]
}

export interface IPostWithUser extends IUser, IPostCart {
}