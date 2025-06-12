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
    user: IUser
}

export interface ICreatePost {
    name: string
    topic?: string
    text?: string
    tags?: ITag[]
    link?: string
    images?: IImage[],
}

export interface IPostForm extends Omit<ICreatePost, 'tags' | 'images'> {
    id: number
    tags?: string[]
    images?: string[]
}