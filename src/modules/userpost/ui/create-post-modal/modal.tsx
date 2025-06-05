import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Input } from "../../../../shared/ui/input";
import { Modal } from "../../../../shared/ui/modal";
import { styles } from "./modal.styles";
import {
	GalleryIcon,
	SendIcon,
	SmileIcon,
	TrashIcon,
} from "../../../../shared/ui/icons";
import { IPostCart, IPostCartForm, ITag } from "../../types";
import { usePost } from "../../hooks";
import { TagsSelector } from "../tags-selector";
import { useAllTags } from "../../hooks/useAllTags";
import { COLORS } from "../../../../shared/ui/colors";

interface ICreatePostModalProps {
	isVisible: boolean;
	onClose: () => void;
	editingPost?: Post;
}

export function CreatePostModal(props: ICreatePostModalProps) {
	const { posts, createPost, updatePost } = usePost()
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	// const [selectedTags, setSelectedTags] = useState<string[]>([])
	const { tags } = useAllTags();

	const { handleSubmit, setValue, control } = useForm<IPostCartForm>();

	useEffect(() => {
		if (props.editingPost) {
			setValue('name', props.editingPost.name);
			setValue('text', props.editingPost.text);
			setValue('tags', props.editingPost.tags);
			setSelectedImages(props.editingPost.images || []);
		}
	}, [props.editingPost]);

	function removeImage(index: number) {
		const updatedImages = selectedImages.filter((_, i) => i !== index);
		setSelectedImages(updatedImages);
		// setValue("images", updatedImages);
	}

	async function pickImages() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			base64: true,
		});

		if (!result.canceled) {
			const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
			if (!imageUri) return

			const updatedImages = [...selectedImages, imageUri];

			setSelectedImages(updatedImages);
			// setValue("images", updatedImages);
		}
	}

	async function onSubmit(data: IPostCartForm) {
		try {
			if (props.editingPost) {
				await updatePost(props.editingPost.id, data);
			} else {
				await createPost({ ...data });
			}
			props.onClose();
		} catch (error) {
			console.error('Error submitting post:', error);
		}
	}

	return (
		<Modal
			title="Створення публікації"
			visible={props.isVisible}
			onClose={props.onClose}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
				keyboardShouldPersistTaps="handled"
			>
				<View style={{ paddingHorizontal: 16 }}>
					<Controller
						control={control}
						name="name"
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
						name="topic"
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Тема публікації"
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
						name="text"
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Опис"
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
						name="tags"
						render={({ field: { value, onChange } }) => (
							<TagsSelector
								options={tags}
								value={value}
								onChange={onChange}




								// allTags={tags}
								// onChange={({ tags }) => {
								// 	onChange(tags);
								// }}
							/>
						)}
					/>

					<Controller
						control={control}
						name="link"
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Посилання на ресурс"
								value={value}
								onChangeText={onChange}
								placeholder="Додайте посилання до цікавої публікації"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>

					{selectedImages.length > 0 &&
						selectedImages.map((uri, index) => (
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
									source={{uri}}
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
										backgroundColor: "rgba(255, 255, 255, 1)",
										borderColor: COLORS.darkPlum,
										borderWidth: 2,
										borderRadius: 15,
										padding: 5,
										zIndex: 1,
									}}
									onPress={() => removeImage(index)}
								>
									<TrashIcon />
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
					<TouchableOpacity style={styles.optionDiv}>
						<SmileIcon />
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
