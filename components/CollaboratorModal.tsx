interface CollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSelect: (collaborators: Collaborator[]) => void;
  // selectedCollaborators: Collaborator[];
}

const CollaboratorModal = ({
  isOpen,
  onClose,
}: // OnSelect,
// selectedCollaborators,
CollaboratorModalProps) => {
  return <div>CollaboratorModal</div>;
};

export default CollaboratorModal;
