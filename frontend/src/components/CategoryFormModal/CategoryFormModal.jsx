import './CategoryFormModal.css';

const CategoryFormModal = ({
    isOpen,
    isEditing,
    currentItem,
    onClose,
    onSave,
    onChange,
    entityName = 'Item'
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{isEditing ? `Edit ${entityName}` : `Add New ${entityName}`}</h2>
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        value={currentItem.name}
                        onChange={(e) => onChange({ ...currentItem, name: e.target.value })}
                        placeholder={`Enter ${entityName.toLowerCase()} name`}
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        value={currentItem.status}
                        onChange={(e) => onChange({ ...currentItem, status: e.target.value })}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryFormModal;
