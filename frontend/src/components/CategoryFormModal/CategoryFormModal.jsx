import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormInput from '../FormInput/FormInput';
import './CategoryFormModal.css';

const CategoryFormModal = ({
    isOpen,
    isEditing,
    currentItem,
    onClose,
    onSave,
    entityName = 'Item'
}) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Name'),
        status: Joi.string().valid('active', 'inactive').default('active').label('Status')
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            name: '',
            status: 'active'
        }
    });

    useEffect(() => {
        if (isOpen && currentItem) {
            reset({
                name: currentItem.name || '',
                status: currentItem.status || 'active'
            });
        }
    }, [isOpen, currentItem, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{isEditing ? `Edit ${entityName}` : `Add New ${entityName}`}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        label="Name *"
                        placeholder={`Enter ${entityName.toLowerCase()} name`}
                        error={errors.name}
                        autoFocus
                        {...register('name')}
                    />

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            className="form-input"
                            {...register('status')}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryFormModal;
