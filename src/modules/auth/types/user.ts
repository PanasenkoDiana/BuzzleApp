import { IAlbum } from "../../albums/types"
import { IImage } from "../../userpost/types"

export interface IUser{
    id: number
    email: string
    username: string
    profileImage: string | null
    name: string
    surname: string
    images: IImage[],
    albums: IAlbum[]
}