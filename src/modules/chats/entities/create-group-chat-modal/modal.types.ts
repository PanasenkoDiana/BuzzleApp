export interface ICreateGroupChatModalProps {
    isVisible: boolean
    onClose: () => void
    onSwitch: () => void
}

export interface IGroupForm {
    name: string
    avatar: string
    members: string[]
}