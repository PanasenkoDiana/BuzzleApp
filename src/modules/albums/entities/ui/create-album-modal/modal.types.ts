
export interface ICreateAlbumModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export interface ICreateAlbumModalForm{
    name: string
    topic: string
    year: number
}

export interface IUpdateAlbumModalForm extends ICreateAlbumModalForm{
    id: number
}