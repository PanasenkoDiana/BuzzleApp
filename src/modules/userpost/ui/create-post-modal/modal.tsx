import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Input } from "../../../../shared/ui/input";
import { Modal } from "../../../../shared/ui/modal";
import { styles } from "./modal.styles";
import { GalleryIcon, SendIcon, TrashIcon } from "../../../../shared/ui/icons";
import { IPostForm } from "../../types";
import { usePost } from "../../hooks";
import { TagsSelector } from "../tags-selector";
import { useAllTags } from "../../hooks/useAllTags";
import { COLORS } from "../../../../shared/ui/colors";
import { Links, ILink } from "../links";

interface ICreatePostModalProps {
	isVisible: boolean;
	onClose: () => void;
}

export function CreatePostModal({ isVisible, onClose }: ICreatePostModalProps) {
	const { createPost, getAllPosts, getMyPosts } = usePost();
	const { tags } = useAllTags();
	const [selectedBase64Images, setSelectedBase64Images] = useState<string[]>(
		[]
	);

	const { control, handleSubmit, reset } = useForm<IPostForm>({
		defaultValues: {
			title: "",
			content: "",
			topic: "",
			tags: [],
			links: [],
			images: [],
		},
	});

	async function pickImages() {
		const permission =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permission.status !== "granted") {
			Alert.alert(
				"Permission needed",
				"Please grant media library permission."
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: true,
			quality: 1,
			base64: true,
		});

		if (!result.canceled && result.assets.length > 0) {
			// Извлекаем base64 и формируем Data URI
			const base64Imgs = result.assets
				.map((asset) => asset.base64)
				.filter(Boolean) as string[];
			const dataUris = base64Imgs.map(
				(b64) => `data:image/png;base64,${b64}`
			);

			setSelectedBase64Images((prev) => [...prev, ...dataUris]);
		}
	}

	function removeImage(index: number) {
		setSelectedBase64Images((prev) => prev.filter((_, i) => i !== index));
	}

	async function onSubmit(data: IPostForm) {
		try {
			const postData = {
				...data,
				images: selectedBase64Images,
			};
			console.log("Submitting post:", data);

			const result = await createPost(postData);

			if (result?.status === "success") {
				Alert.alert("Success", "Post created successfully");
				reset();
				setSelectedBase64Images([]);
				onClose();
			} else {
				Alert.alert(
					"Error",
					result?.message || "Failed to create post"
				);
			}
			Promise.all([getAllPosts(), getMyPosts()]);
		} catch (error) {
			console.error("Create Post Error:", error);
			Alert.alert("Error", "Unexpected error occurred");
		}
	}

	return (
		<Modal
			title="Створення публікації"
			visible={isVisible}
			onClose={onClose}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.container}>
					<Controller
						control={control}
						name="title"
						rules={{ required: "Напишіть назву публікації" }}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Назва публікації"
								value={value}
								onChangeText={onChange}
								placeholder="Напишіть назву публікації"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="content"
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Опис"
								multiline={true}
								value={value}
								onChangeText={onChange}
								placeholder="Напишіть опис публікації"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="topic"
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Тема"
								value={value}
								onChangeText={onChange}
								placeholder="Напишіть тему публікації"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="tags"
						render={({ field: { value, onChange } }) => (
							<TagsSelector
								options={tags}
								value={value}
								onChange={onChange}
							/>
						)}
					/>

					<Controller
						control={control}
						name="links"
						render={({ field: { onChange } }) => (
							<Links onChange={onChange} />
						)}
					/>

					{selectedBase64Images.length > 0 &&
						selectedBase64Images.map((uri, index) => (
							<View
								key={index}
								style={{
									marginVertical: 10,
									position: "relative",
									width: "100%",
									aspectRatio: 16 / 9,
								}}
							>
								<Image
									source={{ uri }}
									style={{
										width: "100%",
										height: "100%",
										borderRadius: 8,
										borderWidth: 1,
										borderColor: "#ccc",
										resizeMode: "cover",
									}}
								/>
								<TouchableOpacity
									style={{
										position: "absolute",
										top: 10,
										right: 10,
										backgroundColor:
											"rgba(255, 255, 255, 1)",
										borderColor: COLORS.darkPlum,
										borderWidth: 2,
										borderRadius: 15,
										padding: 5,
										zIndex: 1,
									}}
									onPress={() => removeImage(index)}
								>
									<TrashIcon
										width={20}
										height={20}
										stroke={COLORS.darkPlum}
									/>
								</TouchableOpacity>
							</View>
						))}
				</View>

				<View style={styles.bottomContainer}>
					<TouchableOpacity
						style={styles.optionDiv}
						onPress={pickImages}
					>
						<GalleryIcon />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={handleSubmit(onSubmit)}
					>
						<Text style={styles.submitButtonText}>Публікація</Text>
						<SendIcon />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</Modal>
	);
}
