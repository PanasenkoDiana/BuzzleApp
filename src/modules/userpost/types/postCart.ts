import { IImage, ITag } from "."
import { IUser } from "../../auth/types"

export interface IPost {
    id: number
    title: string
    topic?: string
    content?: string
    tags?: ITag[]
    link?: string
    images?: IImage[],
    author: IUser
}

export interface ICreatePost {
    title: string
    topic?: string
    content?: string
    tags?: ITag[]
    link?: string
    images?: IImage[],
}

export interface IPostForm extends Omit<ICreatePost, 'tags' | 'images'> {
    id: number
    tags?: string[]
    images?: string[]
}