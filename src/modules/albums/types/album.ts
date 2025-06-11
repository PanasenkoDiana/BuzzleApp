import { IImage } from "../../userpost/types";

export interface IAlbum{
    id: number
    name: string
    theme: string
    year: number
    images: IImage[]
}