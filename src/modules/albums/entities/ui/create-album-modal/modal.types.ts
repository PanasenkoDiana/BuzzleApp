import { ITag } from "../../../../userpost/types";

export interface ICreateAlbumModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export interface ICreateAlbumModalForm{
    name: string
    topic?: string
    createdAt: number
}

export interface IUpdateAlbumModalForm extends ICreateAlbumModalForm{
    id: number
}


export interface IUpdateAlbumModalFormCredentials {
    id: number;
    name: string;
    topic?: ITag;
    createdAt: number;
}