import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormInput from '../FormInput/FormInput';


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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] backdrop-blur-[4px]" onClick={onClose}>
            <div className="bg-white p-[30px] rounded-xl w-[500px] max-w-[90%] shadow-2xl animate-[modalSlideIn_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
                <h2 className="m-0 mb-6 text-slate-800 text-2xl font-semibold">{isEditing ? `Edit ${entityName}` : `Add New ${entityName}`}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        label="Name *"
                        placeholder={`Enter ${entityName.toLowerCase()} name`}
                        error={errors.name}
                        autoFocus
                        {...register('name')}
                    />

                    <div className="mb-5">
                        <label className="block mb-2 font-semibold text-slate-700 text-sm">Status</label>
                        <select
                            className="w-full p-3 border-2 border-slate-200 rounded-lg text-[0.95rem] transition-all focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                            {...register('status')}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" className="bg-slate-400 text-white border-none py-2.5 px-5 rounded-lg font-medium cursor-pointer transition-all hover:bg-slate-500" onClick={onClose}>Cancel</button>
                        <button type="submit" className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none py-2.5 px-5 rounded-lg font-medium cursor-pointer shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryFormModal;
