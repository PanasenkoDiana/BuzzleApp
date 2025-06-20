import { Image, ImageProps } from "react-native"
import avatar from '../../../../assets/default_avatar.png';

export function DefaultAvatar(props: ImageProps){
    return (
        <Image source={avatar} {...props}/>
    )
}