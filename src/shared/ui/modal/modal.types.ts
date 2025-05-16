import { ReactNode } from "react";
import { ModalProps } from "react-native";

export interface IModalProps extends ModalProps {
	title?: string;
	children?: ReactNode;
	visible?: boolean;
	onClose: () => void;
}
