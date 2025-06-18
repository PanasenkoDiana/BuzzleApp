import { IImage } from "../../userpost/types";



export interface Avatar {
//     id Int @id @default(autoincrement())

//   image      Image   @relation("AvatarImages", fields: [imageId], references: [id])
//   imageId    Int
//   profile    Profile @relation(fields: [profile_id], references: [id])
//   profile_id Int
//   active     Boolean @default(true)
//   shown      Boolean @default(true)
    id: number;
    imageId: number;
    profile_id: number;
    active: boolean;
    shown: boolean;
    image: IImage;
}