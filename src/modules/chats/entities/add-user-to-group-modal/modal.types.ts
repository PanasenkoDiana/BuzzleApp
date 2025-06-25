export interface IAddUserToGroupModalProps {
    isVisible: boolean
    onClose: () => void
    onSave: (selectedIds: number[]) => void;
}