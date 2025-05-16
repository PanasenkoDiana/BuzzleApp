import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { CloseIcon } from "../icons";

import { IModalProps } from "./modal.types";
import { styles } from "./modal.styles";

export function Modalka(props: IModalProps) {
    const {title, children, visible, onClose, ...otherProps} = props

	return (
		<Modal
            visible={visible}
            onRequestClose={onClose}
            transparent
            {...otherProps}
        >
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <CloseIcon width={40} height={40} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
	);
}
