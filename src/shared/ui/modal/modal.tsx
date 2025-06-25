import React from "react";
import { View, Text, TouchableOpacity, Modal, ModalProps } from "react-native";
import { CloseIcon } from "../icons";
import { styles } from "./modal.styles";

export interface IModalProps extends ModalProps {
	title?: string;
	visible: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

// Базовая модалка с заголовком
export function Modalka(props: IModalProps) {
	const { title, children, visible, onClose, ...otherProps } = props;

	return (
		<Modal
			visible={visible}
			onRequestClose={onClose}
			transparent
			animationType="fade"
			{...otherProps}
		>
			<View style={styles.container}>
				<View style={styles.modalContent}>
					<View style={styles.header}>
						<Text style={styles.title}>{title}</Text>
						<TouchableOpacity onPress={onClose} style={styles.closeButton}>
							<CloseIcon width={40} height={40} />
						</TouchableOpacity>
					</View>
					<View style={{ justifyContent: "flex-start", alignItems: "center" }}>
						{children}
					</View>
				</View>
			</View>
		</Modal>
	);
}

// Центрированная модалка с заголовком
export function ModalInCenter(props: IModalProps) {
	const { title, children, visible, onClose, ...otherProps } = props;

	return (
		<Modal
			visible={visible}
			onRequestClose={onClose}
			transparent
			animationType="fade"
			{...otherProps}
		>
			<View style={styles.centerModal}>
				<View style={styles.centerModalContent}>
					<View style={styles.header}>
						<Text style={styles.title}>{title}</Text>
						<TouchableOpacity onPress={onClose} style={styles.closeButton}>
							<CloseIcon width={40} height={40} />
						</TouchableOpacity>
					</View>
					<View style={{ justifyContent: "flex-start", alignItems: "center" }}>
						{children}
					</View>
				</View>
			</View>
		</Modal>
	);
}

// Центрированная модалка без заголовка
export function ModalInCenterWithoutHeader(props: IModalProps) {
	const { children, visible, onClose, ...otherProps } = props;

	return (
		<Modal
			visible={visible}
			onRequestClose={onClose}
			transparent
			animationType="fade"
			{...otherProps}
		>
			<View style={styles.centerModal}>
				<View style={styles.centerModalContent}>
					<View style={{ justifyContent: "flex-start", alignItems: "center" }}>
						{children}
					</View>
				</View>
			</View>
		</Modal>
	);
}

Modalka.InCenter = ModalInCenter
Modalka.InCenterWithoutHeader = ModalInCenterWithoutHeader