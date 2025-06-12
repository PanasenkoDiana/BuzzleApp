import { UserPost } from "../../modules/userpost/pages/UserPost";

export default function MyPostsPage() {
	return (
		<UserPost haveHeader={false} isMyPosts={true}></UserPost>
	);
}