import { IAlbum } from "../../albums/types"
import { IImage } from "../../userpost/types"
import { Profile } from "./profile"

export interface IUser{
    id: number
    username: string
    name: string
    surname: string
    Profile: Profile
}