import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import LocationSearchInput from '../LocationInput/LocationSearchInput';
import FormInput from '../FormInput/FormInput';
import './JobFormModal.css';

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

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? 'Edit Job' : 'Post New Job'}</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="scrollable-form">
                    <div className="form-section">
                        <h3 className="section-title">Basic Information</h3>
                        <div className="form-grid">
                            <FormInput
                                label="Job Title *"
                                placeholder="e.g. Senior Software Engineer"
                                error={errors.title}
                                {...register('title')}
                            />

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    className={`form-input ${errors.categoryId ? 'is-invalid' : ''}`}
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
                                {errors.categoryId && <div className="error-message inline">{errors.categoryId.message}</div>}
                            </div>

                            <FormInput
                                label="Company Name"
                                placeholder="Company name"
                                error={errors.companyName}
                                {...register('companyName')}
                            />

                            <div className="form-group">
                                <label>Location</label>
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
                                {errors.location && <div className="error-message inline">{errors.location.message}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Job Details</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Job Level</label>
                                <select
                                    className="form-input"
                                    {...register('jobLevel')}
                                >
                                    <option value="entry-level">Entry Level</option>
                                    <option value="mid-level">Mid Level</option>
                                    <option value="senior-level">Senior Level</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Employment Type</label>
                                <select
                                    className="form-input"
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

                    <div className="form-section">
                        <h3 className="section-title">Requirements</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Education Level</label>
                                <select
                                    className="form-input"
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

                            <div className="form-group full-width">
                                <FormInput
                                    label="Skills (Comma Separated)"
                                    placeholder="e.g. React, Node.js, SQL"
                                    error={errors.skills}
                                    {...register('skills')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Description</h3>
                        <div className="form-group">
                            <label>Job Description *</label>
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
                            {errors.description && <div className="error-message inline">{errors.description.message}</div>}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isEditing ? 'Update Job' : 'Create Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobFormModal;
