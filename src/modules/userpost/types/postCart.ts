import { ITag } from "."

export interface IPostCart {
    name: string
    topic?: string
    text?: string
    tags?: string[]
    link?: string
    images?: string[]
}