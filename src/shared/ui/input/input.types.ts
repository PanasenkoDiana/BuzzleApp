import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export interface IInputProps extends TextInputProps {
	label?: string;
	placeholder?: string;
	rightIcon?: ReactNode;
	error?: string;
	value?: string;
	disabled?: boolean;
}

export interface IInputPasswordProps
	extends Omit<IInputProps, "rightIcon" | "leftIcon"> {}
