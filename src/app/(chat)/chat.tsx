import { JSX } from "react/jsx-runtime";
import { ChatScreen } from "../../modules/chats/pages/ChatScreen/ChatScreen";

export default function Chat(props: JSX.IntrinsicAttributes & { route: { params: { recipientId: string; recipientName: string; }; }; }){
    return <ChatScreen {...props} />;
}