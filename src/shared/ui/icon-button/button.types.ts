import { ReactNode } from "react";


export interface IIconButtonProps {
    icon: ReactNode
    onPress: ()=> void
    style? : {}
}