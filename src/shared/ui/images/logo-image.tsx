import { Image, ImageProps } from "react-native"

export function LogoImage(props: ImageProps){
    return (
        <Image source={require('../../../../assets/logo.png')} {...props}/>
    )
}
