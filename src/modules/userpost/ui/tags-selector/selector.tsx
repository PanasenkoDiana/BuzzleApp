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

type Props = {
	value: ITag[];
	onChange: (payload: { tags: ITag[]; newTags: ITag[] }) => void;
	options: ITag[]; // из БД
};

export function TagsSelector({ value, onChange, options }: Props) {
	const [visible, setVisible] = useState(false);
	const [customTag, setCustomTag] = useState('');

	// Проверка существования тега по name
	const exists = (name: string) => value.some((v) => v.name === name);

	const toggleTag = (tag: ITag) => {
		if (exists(tag.name)) {
			const newValues = value.filter((v) => v.name !== tag.name);
			handleChange(newValues);
		} else {
			handleChange([...value, tag]);
		}
		setVisible(false);
	};

	const handleRemove = (name: string) => {
		const newValues = value.filter((v) => v.name !== name);
		handleChange(newValues);
	};

	const handleCustomAdd = () => {
		const trimmed = customTag.trim();
		if (!trimmed || exists(trimmed)) return;

		const newTag: ITag = { id: null, name: trimmed };
		handleChange([...value, newTag]);
		setCustomTag('');
		setVisible(false);
	};

	const handleChange = (tags: ITag[]) => {
		const existingTags = tags.filter((t) => t.id !== null);
		const newTags = tags.filter((t) => t.id === null);
		onChange({ tags: existingTags, newTags });
	};

	return (
		<View style={styles.mainView}>
			<Text style={styles.labelText}>Теги</Text>
			<View style={styles.allTags}>
				{value.map((tag) => (
					<View
						style={styles.tag}
						key={`${tag.name}_${tag.id ?? 'new'}`}
					>
						<Text style={styles.tagText}>{tag.name}</Text>
						<TouchableOpacity
							style={styles.tagDeleteButton}
							onPress={() => handleRemove(tag.name)}
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

			<Modal visible={visible} animationType="slide" transparent={false}>
				<View style={{ flex: 1, padding: 16 }}>
					<FlatList
						data={options}
						keyExtractor={(item) => item.id?.toString() ?? item.name}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => toggleTag(item)}
								style={{ padding: 10 }}
							>
								<Text style={{ fontSize: 16 }}>{item.name}</Text>
							</TouchableOpacity>
						)}
						ItemSeparatorComponent={() => (
							<View
								style={{ height: 1, backgroundColor: '#ccc' }}
							/>
						)}
					/>

					<TextInput
						value={customTag}
						onChangeText={setCustomTag}
						placeholder="Новый тег"
						style={{
							borderWidth: 1,
							borderColor: '#ccc',
							padding: 10,
							marginTop: 20,
							borderRadius: 5,
						}}
					/>
					<TouchableOpacity
						onPress={handleCustomAdd}
						style={{
							backgroundColor: '#007bff',
							padding: 10,
							marginTop: 10,
							alignItems: 'center',
							borderRadius: 5,
						}}
					>
						<Text style={{ color: '#fff' }}>Добавить</Text>
					</TouchableOpacity>

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
