import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import LocationSearchInput from '../LocationInput/LocationSearchInput';
import FormInput from '../FormInput/FormInput';


const JobFormModal = ({
    isOpen,
    isEditing,
    currentJob,
    categories,
    onClose,
    onSave,
}) => {
    const schema = Joi.object({
        title: Joi.string().required().label('Job Title'),
        categoryId: Joi.string().required().label('Category'),
        companyName: Joi.string().allow('', null).label('Company Name'),
        location: Joi.string().allow('', null).label('Location'),
        jobLevel: Joi.string().valid('entry-level', 'mid-level', 'senior-level').default('entry-level').label('Job Level'),
        type: Joi.string().valid('full-time', 'part-time', 'contract', 'remote', 'internship').default('full-time').label('Employment Type'),
        openings: Joi.number().min(1).default(1).label('No. of Openings'),
        salary: Joi.string().allow('', null).label('Salary'),
        industry: Joi.string().allow('', null).label('Industry'),
        expiryDate: Joi.string().allow('', null).label('Expiry Date'),
        education: Joi.string().allow('', null).default('see').label('Education Level'),
        experience: Joi.string().allow('', null).label('Experience Required'),
        skills: Joi.string().allow('', null).label('Skills'),
        description: Joi.string().required().label('Job Description')
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            title: '',
            categoryId: '',
            companyName: '',
            location: '',
            jobLevel: 'entry-level',
            type: 'full-time',
            openings: 1,
            salary: '',
            industry: '',
            expiryDate: '',
            education: 'see',
            experience: '',
            skills: '',
            description: ''
        }
    });

    useEffect(() => {
        if (isOpen && currentJob) {
            reset({
                title: currentJob.title || '',
                categoryId: currentJob.categoryId || '',
                companyName: currentJob.companyName || '',
                location: currentJob.location || '',
                jobLevel: currentJob.jobLevel || 'entry-level',
                type: currentJob.type || 'full-time',
                openings: currentJob.openings || 1,
                salary: currentJob.salary || '',
                industry: currentJob.industry || '',
                expiryDate: currentJob.expiryDate ? new Date(currentJob.expiryDate).toISOString().split('T')[0] : '',
                education: currentJob.education || 'see',
                experience: currentJob.experience || '',
                skills: currentJob.skills || '',
                description: currentJob.description || ''
            });
        }
    }, [isOpen, currentJob, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    if (!isOpen) return null;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] backdrop-blur-[4px]" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl animate-[modalSlideIn_0.3s_ease-out] w-[900px] max-w-[95%] h-[85vh] flex flex-col p-0" onClick={(e) => e.stopPropagation()}>
                <div className="px-[30px] py-6 border-b-2 border-slate-200 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-t-xl">
                    <h2 className="m-0 text-2xl text-white">{isEditing ? 'Edit Job' : 'Post New Job'}</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-[30px]">
                    <div className="mb-8">
                        <h3 className="m-0 mb-4 text-[1.1rem] text-slate-800 pb-2 border-b-2 border-slate-200">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormInput
                                label="Job Title *"
                                placeholder="e.g. Senior Software Engineer"
                                error={errors.title}
                                {...register('title')}
                            />

                            <div className="mb-5">
                                <label className="block mb-2 font-semibold text-slate-700 text-sm">Category *</label>
                                <select
                                    className={`w-full p-3 border-2 border-slate-200 rounded-lg text-[0.95rem] transition-all focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] ${errors.categoryId ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)]' : ''}`}
                                    {...register('categoryId')}
                                >
                                    <option value="">Select Category</option>
                                    {categories
                                        .filter(cat => cat.status === 'active')
                                        .map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))
                                    }
                                </select>
                                {errors.categoryId && <div className="text-[#d63031] text-[0.85rem] mt-1 inline-block">{errors.categoryId.message}</div>}
                            </div>

                            <FormInput
                                label="Company Name"
                                placeholder="Company name"
                                error={errors.companyName}
                                {...register('companyName')}
                            />

                            <div className="mb-5">
                                <label className="block mb-2 font-semibold text-slate-700 text-sm">Location</label>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <LocationSearchInput
                                            value={field.value}
                                            onChange={(val) => field.onChange(val)}
                                            placeholder="e.g. Kathmandu, Remote"
                                        />
                                    )}
                                />
                                {errors.location && <div className="text-[#d63031] text-[0.85rem] mt-1 inline-block">{errors.location.message}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="m-0 mb-4 text-[1.1rem] text-slate-800 pb-2 border-b-2 border-slate-200">Job Details</h3>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="mb-5">
                                <label className="block mb-2 font-semibold text-slate-700 text-sm">Job Level</label>
                                <select
                                    className="w-full p-3 border-2 border-slate-200 rounded-lg text-[0.95rem] transition-all focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                                    {...register('jobLevel')}
                                >
                                    <option value="entry-level">Entry Level</option>
                                    <option value="mid-level">Mid Level</option>
                                    <option value="senior-level">Senior Level</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 font-semibold text-slate-700 text-sm">Employment Type</label>
                                <select
                                    className="w-full p-3 border-2 border-slate-200 rounded-lg text-[0.95rem] transition-all focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                                    {...register('type')}
                                >
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="remote">Remote</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                            <FormInput
                                label="No. of Openings"
                                type="number"
                                min="1"
                                error={errors.openings}
                                {...register('openings')}
                            />

                            <FormInput
                                label="Salary"
                                placeholder="e.g. Negotiable, 50k-100k"
                                error={errors.salary}
                                {...register('salary')}
                            />

                            <FormInput
                                label="Industry"
                                placeholder="e.g. IT, Healthcare"
                                error={errors.industry}
                                {...register('industry')}
                            />

                            <FormInput
                                label="Expiry Date"
                                type="date"
                                error={errors.expiryDate}
                                {...register('expiryDate')}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="m-0 mb-4 text-[1.1rem] text-slate-800 pb-2 border-b-2 border-slate-200">Requirements</h3>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="mb-5">
                                <label className="block mb-2 font-semibold text-slate-700 text-sm">Education Level</label>
                                <select
                                    className="w-full p-3 border-2 border-slate-200 rounded-lg text-[0.95rem] transition-all focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
                                    {...register('education')}
                                >
                                    <option value="see">SEE</option>
                                    <option value="high-school">High School (+2)</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="bachelor">Bachelor's</option>
                                    <option value="master">Master's</option>
                                    <option value="phd">PhD</option>
                                </select>
                            </div>

                            <FormInput
                                label="Experience Required"
                                placeholder="e.g. 2+ years in React"
                                error={errors.experience}
                                {...register('experience')}
                            />

                            <div className="mb-5 md:col-span-2">
                                <FormInput
                                    label="Skills (Comma Separated)"
                                    placeholder="e.g. React, Node.js, SQL"
                                    error={errors.skills}
                                    {...register('skills')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="m-0 mb-4 text-[1.1rem] text-slate-800 pb-2 border-b-2 border-slate-200">Description</h3>
                        <div className="mb-5">
                            <label className="block mb-2 font-semibold text-slate-700 text-sm">Job Description *</label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={(value) => field.onChange(value)}
                                        placeholder="Enter job description with formatting..."
                                    />
                                )}
                            />
                            {errors.description && <div className="text-[#d63031] text-[0.85rem] mt-1 inline-block">{errors.description.message}</div>}
                        </div>
                    </div>

                    <div className="px-[30px] py-5 border-t-2 border-slate-200 flex justify-end gap-3 bg-slate-50 rounded-b-xl">
                        <button type="button" className="bg-slate-400 text-white border-none py-2.5 px-5 rounded-lg font-medium cursor-pointer transition-all hover:bg-slate-500" onClick={onClose}>Cancel</button>
                        <button type="submit" className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none py-2.5 px-5 rounded-lg font-medium cursor-pointer shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>
                            {isEditing ? 'Update Job' : 'Create Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobFormModal;
