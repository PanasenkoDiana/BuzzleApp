import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export interface IInputProps extends TextInputProps {
	label?: string;
	placeholder?: string;
	rightIcon?: ReactNode;
	leftIcon?: ReactNode
	error?: string;
	value?: any;
	disabled?: boolean;
}

export interface IInputPasswordProps
	extends Omit<IInputProps, "rightIcon" | "leftIcon"> {}
