import { ReactNode } from "react"
import { View } from "react-native"

interface IFriendsLayout {
    children: ReactNode
}

export function FriendsLayout(props: IFriendsLayout) {
    return (
        <View>
            {props.children}
        </View>
    )
}