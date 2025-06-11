
export interface ICreateAlbumModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export interface ICreateAlbumModalForm{
    name: string
    theme: string
    year: number
}