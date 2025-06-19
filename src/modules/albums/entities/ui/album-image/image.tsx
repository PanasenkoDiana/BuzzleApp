import { IAlbumImage } from "./image.types";
import { styles } from "./image.styles";
import { View, Image } from "react-native";
// import { IconButton } from '../../../../shared/ui/icon-button';
// import { EyeIcon, EyeSlashIcon, PlusIcon, TrashIcon } from '../../../../shared/ui/icons';
// import { COLORS } from '../../../../shared/ui/colors';
import { useState } from "react";
import { IconButton } from "../../../../../shared/ui/icon-button";
import { COLORS } from "../../../../../shared/ui/colors";
import {
	EyeIcon,
	EyeSlashIcon,
	PlusIcon,
	TrashIcon,
} from "../../../../../shared/ui/icons";

export function AlbumImage(props: IAlbumImage) {
	const [showMyPhoto, setShowMyPhoto] = useState(true);

	return (
		<View style={styles.myPhotoView}>
			<Image
				style={styles.myPhotoImage}
				source={{
					uri: props.image,
				}}
			/>

			<View style={styles.myPhotoButtonsView}>
				<IconButton
					style={{ backgroundColor: COLORS.white }}
					onPress={() => {
						setShowMyPhoto(!showMyPhoto);
					}}
					icon={
						showMyPhoto ? (
							<EyeIcon
								width={20}
								height={20}
								stroke={COLORS.darkPlum}
							/>
						) : (
							<EyeSlashIcon
								width={20}
								height={20}
								stroke={COLORS.darkPlum}
							/>
						)
					}
				/>
				<IconButton
					style={{ backgroundColor: COLORS.white }}
					onPress={async () => {
						props.deleteFunction(props.id)
						console.log(props.id)
					}}
					icon={
						<TrashIcon
							width={20}
							height={20}
							stroke={COLORS.darkPlum}
						/>
					}
				/>
			</View>
		</View>
	);
}

function Small(props: IAlbumImage) {
	const [showMyPhoto, setShowMyPhoto] = useState(true);

	return (
		<View style={styles.myPhotoSmallView}>
			<Image
				style={styles.myPhotoSmallImage}
				source={{
					uri: props.image,
				}}
			/>

			<View style={styles.myPhotoButtonsView}>
				<IconButton
					style={{ backgroundColor: COLORS.white }}
					onPress={() => {
						setShowMyPhoto(!showMyPhoto);
					}}
					icon={
						showMyPhoto ? (
							<EyeIcon
								width={20}
								height={20}
								stroke={COLORS.darkPlum}
							/>
						) : (
							<EyeSlashIcon
								width={20}
								height={20}
								stroke={COLORS.darkPlum}
							/>
						)
					}
				/>
				<IconButton
					style={{ backgroundColor: COLORS.white }}
					onPress={async() => {
						await props.deleteFunction(props.id)
					}}
					icon={
						<TrashIcon
							width={20}
							height={20}
							stroke={COLORS.darkPlum}
						/>
					}
				/>
			</View>
		</View>
	);
}

function Add(props: { onPress: () => void }) {
	return (
		<View style={styles.myPhotoASmallAddView}>
			{/* <Image
                style={styles.myPhotoSmallImage}
                source={{
                    uri: props.image,
                }}
            /> */}
			<IconButton
				onPress={() => props.onPress()}
				icon={
					<PlusIcon width={20} height={20} stroke={COLORS.darkPlum} />
				}
			/>
		</View>
	);
}

AlbumImage.Small = Small;
AlbumImage.Add = Add;
