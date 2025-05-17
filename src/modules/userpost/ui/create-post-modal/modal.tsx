import { Controller, useForm } from "react-hook-form"
import { TouchableOpacity, View, Text } from "react-native"
import { Input } from "../../../../shared/ui/input"
import { COLORS } from "../../../../shared/ui/colors"
import { Modal } from "../../../../shared/ui/modal"
import { styles } from './modal.styles'
import { GalleryIcon, SendIcon, SmileIcon } from "../../../../shared/ui/icons"
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker"

interface ICreatePostModalProps {
    isVisible: boolean
    onClose: () => void
}

interface ICreatePostForm {
    name: string
    theme?: string
    description?: string
    tags?: string
    link?: string
    images?: string[]
}



export function CreatePostModal(props: ICreatePostModalProps){
    const { handleSubmit, setError, control } = useForm<ICreatePostForm>()

    function pickImages(){
        
    }

    return (
        <Modal 
            title="Створення публікації"
            visible={props.isVisible}
            onClose={() => props.onClose()}
        >
            {/* <View style={styles.container}> */}
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: {
                            value: true,
                            message: "Код не введенний",
                        },
                        minLength: {
                            value: 6,
                            message: "Має бути 6 цифр",
                        },
                    }}
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Input
                            label="Назва публікації"
                            value={value}
                            onChangeText={onChange}
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
                            label="Тема публікації"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Input
                            label="Опис"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="tags"
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Input
                            label="Теги"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="link"
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Input
                            label="Посилання на ресурс"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={error?.message}
                        />
                    )}
                />

            {/* </View>   */}

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.optionDiv}><GalleryIcon /></TouchableOpacity>
                <TouchableOpacity style={styles.optionDiv}><SmileIcon /></TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={()=> props.onClose()}>
                    <Text style={styles.submitButtonText}>Публікація</Text>
                    <SendIcon />
                </TouchableOpacity>
            </View>
        {/* </View> */}
        </Modal>
    )
}