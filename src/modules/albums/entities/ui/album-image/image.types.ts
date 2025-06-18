export interface IAlbumImage{
    id: number
    image: string
    deleteFunction: (id: number) => void
}