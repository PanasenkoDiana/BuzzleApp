import { Controller, useForm } from 'react-hook-form';
import { Modal } from '../../../../shared/ui/modal'
import { ICreateAlbumModalForm, ICreateAlbumModalProps } from './modal.types'
import { Input } from '../../../../shared/ui/input';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './modal.styles';


export function CreateAlbumModal(props: ICreateAlbumModalProps) {
    const { control, handleSubmit, reset } = useForm<ICreateAlbumModalForm>({

    });

    async function onSubmit(data: ICreateAlbumModalForm) {
        console.log(data)
    }

    return(
        <Modal.InCenter title="Створити альбом" visible={props.isVisible} onClose={props.onClose} >
            <View style={{ gap: 10}} >
                <View style={{ width: '100%' }}>
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
                        name="theme"
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
                        name="year"
                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                            <Input
                                label="Рік альбому"
                                value={value}
                                onChangeText={onChange}
                                placeholder="Оберіть рік"
                                onBlur={onBlur}
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