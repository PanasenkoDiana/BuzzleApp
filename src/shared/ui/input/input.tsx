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

export function Input(props: IInputProps) {
	const { label, error, rightIcon, style, ...otherProps } = props;

	return (
		<View>
			{label && <Text style={styles.label}>{label}</Text>}

			<View style={{ gap: 5 }}>
				<View style={styles.inputWrapper}>
					<TextInput
						style={[
							styles.input,
							rightIcon ? styles.inputWithRightIcon : undefined,
							style,
						]}
						{...otherProps}
					/>
					{rightIcon && (
						<View style={styles.rightIcon}>{rightIcon}</View>
					)}
				</View>
				<View style={{ height: 20 }}>
					{error && (
						<View style={styles.errorBlock}>
							<ErrorIcon width={16} height={16} />
							<Text style={styles.errorText}>{error}</Text>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}

function Password(props: IInputPasswordProps) {
	const { label, error, style, ...otherProps } = props;

	const [hidden, setHidden] = useState(true);

	return (
		<View>
			{label && <Text style={styles.label}>{label}</Text>}

			<View style={{ gap: 5 }}>
				<View style={styles.inputWrapper}>
					<TextInput
						style={[styles.input, styles.inputWithRightIcon, style]}
						{...otherProps}
						secureTextEntry={hidden}
					/>
					<TouchableOpacity
						style={styles.rightIcon}
						onPress={() => {
							setHidden(!hidden);
						}}
					>
						<View>
							{hidden ? (
								<EyeSlashIcon width={30} height={30} />
							) : (
								<EyeIcon width={30} height={30} />
							)}
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ height: 20 }}>
					{error && (
						<View style={styles.errorBlock}>
							<ErrorIcon width={16} height={16} />
							<Text style={styles.errorText}>{error}</Text>
						</View>
					)}
				</View>
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
