import { ITag } from "../../../../userpost/types";

export interface ICreateAlbumModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export interface ICreateAlbumModalForm{
    name: string
    topic?: ITag
    createdAt: number
}

export interface IUpdateAlbumModalForm extends ICreateAlbumModalForm{
    id: number
}