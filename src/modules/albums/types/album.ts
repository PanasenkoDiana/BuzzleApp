import { IImage } from "../../userpost/types";

export interface IAlbum{
    id: number
    name: string
    topic: string
    year: number
    images: IImage[]
}