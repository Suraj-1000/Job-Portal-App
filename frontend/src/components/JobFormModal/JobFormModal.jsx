import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import LocationSearchInput from '../LocationInput/LocationSearchInput';
import FormInput from '../FormInput/FormInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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
        } else if (isOpen) {
            reset({
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
            });
        }
    }, [isOpen, currentJob, reset]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px] h-[85vh] flex flex-col p-0 gap-0 overflow-hidden" onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader className="px-6 py-5 border-b border-slate-200 bg-slate-50">
                    <DialogTitle>{isEditing ? 'Edit Job' : 'Post New Job'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6">
                    <div className="mb-8">
                        <h3 className="mb-4 text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormInput
                                label="Job Title *"
                                placeholder="e.g. Senior Software Engineer"
                                error={errors.title}
                                {...register('title')}
                            />

                            <div className="mb-6 space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Category *</Label>
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories
                                                    .filter(cat => cat.status === 'active')
                                                    .map(cat => (
                                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.categoryId && <div className="text-red-500 text-sm">{errors.categoryId.message}</div>}
                            </div>

                            <FormInput
                                label="Company Name"
                                placeholder="Company name"
                                error={errors.companyName}
                                {...register('companyName')}
                            />

                            <div className="mb-6 space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Location</Label>
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
                                {errors.location && <div className="text-red-500 text-sm">{errors.location.message}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-4 text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">Job Details</h3>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="mb-6 space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Job Level</Label>
                                <Controller
                                    control={control}
                                    name="jobLevel"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Job Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="entry-level">Entry Level</SelectItem>
                                                <SelectItem value="mid-level">Mid Level</SelectItem>
                                                <SelectItem value="senior-level">Senior Level</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="mb-6 space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Employment Type</Label>
                                <Controller
                                    control={control}
                                    name="type"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Employment Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full Time</SelectItem>
                                                <SelectItem value="part-time">Part Time</SelectItem>
                                                <SelectItem value="contract">Contract</SelectItem>
                                                <SelectItem value="remote">Remote</SelectItem>
                                                <SelectItem value="internship">Internship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
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
                        <h3 className="mb-4 text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">Requirements</h3>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="mb-6 space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Education Level</Label>
                                <Controller
                                    control={control}
                                    name="education"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Education" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="see">SEE</SelectItem>
                                                <SelectItem value="high-school">High School (+2)</SelectItem>
                                                <SelectItem value="diploma">Diploma</SelectItem>
                                                <SelectItem value="bachelor">Bachelor's</SelectItem>
                                                <SelectItem value="master">Master's</SelectItem>
                                                <SelectItem value="phd">PhD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
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
                        <h3 className="mb-4 text-lg font-semibold text-slate-800 pb-2 border-b border-slate-200">Description</h3>
                        <div className="mb-5">
                            <Label className="block mb-2 font-semibold text-slate-700 text-sm">Job Description *</Label>
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
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>}
                        </div>
                    </div>
                </form>

                <DialogFooter className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-lg">
                    <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isEditing ? 'Update Job' : 'Create Job'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JobFormModal;
