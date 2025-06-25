import { IUser } from "../../../auth/types"
import { Message } from "../../pages/ChatsHook/Chat.hooks"

export interface ICreateGroupChatModalProps {
    isVisible: boolean
    onClose: () => void
    onSwitch: () => void
}

export interface IGroupForm {
    name: string
    avatar: string | null
    members?: number[]
}

export interface IGroupChat {
    id: number,
    name: string,
    avatar?: string
    members: IUser[] 
    messages: Message[]
}