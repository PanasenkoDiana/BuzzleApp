import { TextInput, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./input.styles";
import { IInputProps, IInputPasswordProps } from "./input.types";
import { KeyIcon, EyeIcon, EyeSlashIcon, ErrorIcon } from "../icons";
import { useState } from "react";
import {
	CodeField,
	useBlurOnFulfill,
	useClearByFocusCell,
	Cursor,
} from "react-native-confirmation-code-field";
import { COLORS } from "../colors";

export function Input(props: IInputProps) {
	const {
		label,
		error,
		rightIcon,
		style,
		disabled,
		multiline,
		leftIcon,
		...otherProps
	} = props;

	return (
		<View>
			{label && (
				<Text
					style={[
						styles.label,
						disabled ? { color: COLORS.lightGray } : null,
					]}
				>
					{label}
				</Text>
			)}

			<View style={{ gap: 5 }}>
				<View style={styles.inputWrapper}>
					{leftIcon && (
						<View style={styles.leftIcon}>{leftIcon}</View>
					)}
					<TextInput
						style={[
							styles.input,
							disabled ? { borderColor: COLORS.lightGray } : null,
							leftIcon ? styles.ifLeftIcon : null,
							// rightIcon ? styles : undefined,
							style,
						]}
						multiline={multiline ? true : false}
						{...otherProps}
					/>
					{rightIcon && (
						<View style={styles.rightIcon}>{rightIcon}</View>
					)}
				</View>
				{/* <View > */}
				{error && (
					<View style={styles.errorBlock}>
						<ErrorIcon width={16} height={16} />
						<Text style={styles.errorText}>{error}</Text>
					</View>
				)}
				{/* </View> */}
			</View>
		</View>
	);
}

function Password(props: IInputPasswordProps) {
	const { label, error, style, disabled, ...otherProps } = props;

	const [hidden, setHidden] = useState(true);

	return (
		<View>
			{label && (
				<Text
					style={[
						styles.label,
						disabled ? { color: COLORS.lightGray } : null,
					]}
				>
					{label}
				</Text>
			)}

			<View style={{ gap: 5 }}>
				<View style={styles.inputWrapper}>
					<TextInput
						placeholderTextColor={
							disabled ? COLORS.lightGray : COLORS.black
						}
						style={[
							styles.input,
							style,
							disabled
								? {
										borderColor: COLORS.lightGray,
										color: COLORS.lightGray,
								  }
								: null,
						]}
						{...otherProps}
						secureTextEntry={hidden}
					/>
					<TouchableOpacity
						style={styles.rightIcon}
						onPress={() => setHidden(!hidden)}
					>
						{hidden ? (
							<EyeSlashIcon width={30} height={30} />
						) : (
							<EyeIcon width={30} height={30} stroke="#81818D" />
						)}
					</TouchableOpacity>
				</View>
				{error && (
					<View style={styles.errorBlock}>
						<ErrorIcon width={16} height={16} />
						<Text style={styles.errorText}>{error}</Text>
					</View>
				)}
			</View>
		</View>
	);
}

interface ICodeInputProps {
	label?: string;
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	error?: string;
}

function Code({ label, value, onChangeText, onBlur, error }: ICodeInputProps) {
	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue: onChangeText,
	});

	return (
		<View>
			{label && <Text style={styles.label}>{label}</Text>}

			<CodeField
				ref={ref}
				{...props}
				value={value}
				onChangeText={onChangeText}
				onBlur={onBlur}
				cellCount={6}
				rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<View
						key={index}
						style={[
							styles.codeCell,
							isFocused && styles.codeCellFocused,
						]}
						onLayout={getCellOnLayoutHandler(index)}
					>
						<Text style={styles.codeCellText}>
							{symbol || (isFocused ? <Cursor /> : "—")}
						</Text>
					</View>
				)}
			/>

			{error && (
				<View style={styles.errorBlock}>
					<ErrorIcon width={16} height={16} />
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
		</View>
	);
}

Input.Password = Password;
Input.Code = Code;
