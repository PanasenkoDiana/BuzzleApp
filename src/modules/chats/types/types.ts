export interface Contact {
	username: string;
	name: string | null;
	surname: string | null;
	profileImage: string | null;
}

export interface ChatMessage {
	id: number;
	content: string;
	author: Contact;
	sent_at: Date;
	attached_image?: string | null;
}

export type RootStackParamList = {
	ChatScreen: {
		recipientId: string;
		recipientName: string;
	};
};
