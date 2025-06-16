import { use, useEffect, useState } from "react";
import { FriendsLayout } from "../../modules/friends/entities/ui/FriendsLayout/FriendsLayout";
import { FriendsPage } from "../../modules/friends/pages/FriendsPage/FriendsPage";

export default function Friends() {
	const [selectedPage, setSelectedPage] = useState<string>("main");

	useEffect(() => {
		console.log(selectedPage);
	}, [selectedPage]);

	return (
		<FriendsLayout
			selectedPage={selectedPage}
			setSelectedPage={(page) => setSelectedPage(page)}
		>
			<FriendsPage
				selectedPage={selectedPage}
				setSelectedPage={(page) => setSelectedPage(page)}
			/>
		</FriendsLayout>
	);
}
