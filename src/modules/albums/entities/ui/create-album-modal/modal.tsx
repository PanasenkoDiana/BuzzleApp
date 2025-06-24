import { Controller, useForm } from 'react-hook-form';
import { ICreateAlbumModalForm, ICreateAlbumModalProps, IUpdateAlbumModalForm, IUpdateAlbumModalFormCredentials } from './modal.types'
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './modal.styles';
import { Modal } from '../../../../../shared/ui/modal';
import { Input } from '../../../../../shared/ui/input';
import { useCreateAlbum } from '../../../hooks/useCreateAlbum';
import { useChangeAlbum } from '../../../hooks/useChangeAlbum';


export function CreateAlbumModal(props: ICreateAlbumModalProps) {
    const { control, handleSubmit } = useForm<ICreateAlbumModalForm>({

    });

    const { refetch } = useCreateAlbum()

    async function onSubmit(data: ICreateAlbumModalForm) {
        console.log(data)
        await refetch(data)

        props.onClose()
    }

    return(
        <Modal.InCenter title="Створити альбом" visible={props.isVisible} onClose={props.onClose} >
            <View style={{ gap: 10}} >
                <View style={{ width: '200%' }}>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Напишіть назву альбому" }}
                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                            <Input
                                label="Назва альбому"
                                value={value}
                                onChangeText={onChange}
                                placeholder="Напишіть назву альбому"
                                onBlur={onBlur}
                                error={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="topic"
                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                            <Input
                                label="Оберіть тему"
                                value={value}
                                onChangeText={onChange}
                                placeholder="Напишіть тему альбому"
                                onBlur={onBlur}
                                error={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="createdAt"
                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                            <Input
                                label="Рік альбому"
                                value={value}
                                onChangeText={onChange}
                                placeholder="Оберіть рік"
                                onBlur={onBlur}
                                keyboardType="numeric"
                                error={error?.message}
                            />
                        )}
                    />
                </View>

                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 10}}>
                    <TouchableOpacity onPress={()=>props.onClose()} style={styles.dismissButton}><Text style={styles.dismissButtonTitle}>Скасувати</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.createButton}><Text style={styles.createButtonTitle}>Зберегти</Text></TouchableOpacity>
                </View>
            </View>
        </Modal.InCenter>
    )
}


export function UpdateAlbumModal(props: IUpdateAlbumModalFormCredentials & ICreateAlbumModalProps) {
	const { control, handleSubmit } = useForm<IUpdateAlbumModalForm>({
		defaultValues: {
			name: props.name,
			topic: props.topic?.name,
			createdAt: props.createdAt,
		},
	});

	const { refetch } = useChangeAlbum();

	async function onSubmit(data: IUpdateAlbumModalForm) {
		const newData = {
			...data,
			id: props.id,
		};
		console.log('Отправка:', newData);
		await refetch(newData);

        props.onClose()
	}

	return (
		<Modal.InCenter
			title="Редагувати альбом"
			visible={props.isVisible}
			onClose={props.onClose}
		>
			<View style={{ gap: 10 }}>
				<View style={{ width: '100%' }}>
					<Controller
						control={control}
						name="name"
						rules={{ required: 'Напишіть назву альбому' }}
						render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
							<Input
								label="Назва альбому"
								value={value}
								onChangeText={onChange}
								placeholder="Напишіть назву альбому"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="topic"
						render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
							<Input
								label="Оберіть тему"
								value={value}
								onChangeText={onChange}
								placeholder="Напишіть тему альбому"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="createdAt"
						render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
							<Input
								label="Рік альбому"
								value={value}
								onChangeText={onChange}
								placeholder="Оберіть рік"
								onBlur={onBlur}
                                keyboardType="numeric"
								error={error?.message}
							/>
						)}
					/>
				</View>

				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
					<TouchableOpacity onPress={props.onClose} style={styles.dismissButton}>
						<Text style={styles.dismissButtonTitle}>Скасувати</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.createButton}>
						<Text style={styles.createButtonTitle}>Зберегти</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal.InCenter>
	);
}




// CreateAlbumModal.Update = Update