import { IImage, ITag } from "../../userpost/types";

export interface IAlbum{
    id: number
    name: string
    topic?: ITag
    createdAt: number
    images: IImage[]
}