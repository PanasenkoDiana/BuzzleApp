import { ITag } from "."

export interface IPostCart {
    name: string
    topic?: string
    text?: string
    tags?: ITag[]
    link?: string
    images?: string[]
}