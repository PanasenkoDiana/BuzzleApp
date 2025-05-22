import { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	FlatList,
	TextInput,
} from 'react-native';
import { styles } from './selector.styles';
import { ITag } from '../../types';

type ITagSelectorProps = {
	value?: string[]
	// sTags: string[];
	onChange: (tags: string[]) => void;
	options: string[]; // из БД
};

export function TagsSelector({  value = [], onChange, options }: ITagSelectorProps) {
	const [visible, setVisible] = useState(false);
	const [customTag, setCustomTag] = useState('');

	// Проверка существования тега по name
	const exists = (name: string ) => value.some((v) => v === name);

	const toggleTag = (tag: string) => {
		if (exists(tag)) {
			const newValues = value.filter((v) => v !== tag);
			handleChange(newValues);
		} else {
			handleChange([...value, tag]);
		}
		setVisible(false);
	};

	const handleRemove = (name: string) => {
		const newValues = value.filter((v) => v !== name);
		handleChange(newValues);
	};

	// const handleCustomAdd = () => {
	// 	const trimmed = customTag.trim();
	// 	if (!trimmed || exists(trimmed)) return;

	// 	const newTag: ITag = { id: null, name: trimmed };
	// 	handleChange([...value, newTag]);
	// 	setCustomTag('');
	// 	setVisible(false);
	// };
	const handleAdd = (tag: string) => {
		const newValues = value.filter((v) => v !== tag);
		handleChange(newValues);
	}

	const handleChange = (tags: string[]) => {
		const userTags = tags.filter((t) => t !== null)
		// const existingTags = tags.filter((t) => t !== null);
		// const newTags = tags.filter((t) => t === null);

		onChange(userTags);
	};

	return (
		<View style={styles.mainView}>
			<Text style={styles.labelText}>Теги</Text>
			<View style={styles.allTags}>
				{value.map((tag) => (
					<View
						style={styles.tag}
						key={`${tag}`}
					>
						<Text style={styles.tagText}>{tag}</Text>
						<TouchableOpacity
							style={styles.tagDeleteButton}
							onPress={() => handleRemove(tag)}
						>
							<Text style={styles.tagDeleteButtonText}> X </Text>
						</TouchableOpacity>
					</View>
				))}

				{value.length < 10 && (
					<TouchableOpacity
						style={styles.addButton}
						onPress={() => setVisible(true)}
					>
						<Text style={styles.addButtonText}> + </Text>
					</TouchableOpacity>
				)}
			</View>

			<TextInput
				// value={customTag}
				onChangeText={handleAdd}
				placeholder="Новый тег"
				style={{
					borderWidth: 1,
					borderColor: '#ccc',
					padding: 10,
					marginTop: 20,
					borderRadius: 5,
				}}
			/>

			<Modal visible={visible} animationType="slide" transparent={false}>
				<View style={{ flex: 1, padding: 16 }}>
					<FlatList
						data={options}
						keyExtractor={(item) => item?.toString() ?? item}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => toggleTag(item)}
								style={{ padding: 10 }}
							>
								<Text style={{ fontSize: 16 }}>{item}</Text>
							</TouchableOpacity>
						)}
						ItemSeparatorComponent={() => (
							<View
								style={{ height: 1, backgroundColor: '#ccc' }}
							/>
						)}
					/>

					{/* <TouchableOpacity
						// onPress={handleCustomAdd}
						style={{
							backgroundColor: '#007bff',
							padding: 10,
							marginTop: 10,
							alignItems: 'center',
							borderRadius: 5,
						}}
					>
						<Text style={{ color: '#fff' }}>Добавить</Text>
					</TouchableOpacity> */}

					<TouchableOpacity
						onPress={() => setVisible(false)}
						style={{ marginTop: 20, alignSelf: 'center' }}
					>
						<Text style={{ color: 'red', fontSize: 18 }}>Закрыть</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}
