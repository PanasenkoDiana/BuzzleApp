import { use, useEffect, useState } from "react";
import { ChatsLayout } from "../../modules/chats/entities/ui/ChatsLayout";
import { ChatsPage } from "../../modules/chats/pages/ChatsPage";

export default function Chats() {
	const [selectedPage, setSelectedPage] = useState<string>("contacts");

	useEffect(() => {
		console.log(selectedPage);
	}, [selectedPage]);

	return (
		<ChatsLayout
			selectedPage={selectedPage}
			setSelectedPage={(page) => setSelectedPage(page)}
		>
			<ChatsPage/>
		</ChatsLayout>
	);
}
