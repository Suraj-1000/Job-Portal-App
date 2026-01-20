import { FaEdit, FaPlus } from 'react-icons/fa';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import LocationSearchInput from '../LocationInput/LocationSearchInput';
import './JobFormModal.css';

const JobFormModal = ({
    isOpen,
    isEditing,
    currentJob,
    categories,
    onClose,
    onSave,
    onChange
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? 'Edit Job' : 'Post New Job'}</h2>
                </div>
                <div className="scrollable-form">
                    <div className="form-section">
                        <h3 className="section-title">Basic Information</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Job Title *</label>
                                <input
                                    type="text"
                                    value={currentJob.title}
                                    onChange={(e) => onChange({ ...currentJob, title: e.target.value })}
                                    placeholder="e.g. Senior Software Engineer"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    value={currentJob.categoryId}
                                    onChange={(e) => onChange({ ...currentJob, categoryId: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories
                                        .filter(cat => cat.status === 'active')
                                        .map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    value={currentJob.companyName}
                                    onChange={(e) => onChange({ ...currentJob, companyName: e.target.value })}
                                    placeholder="Company name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <LocationSearchInput
                                    value={currentJob.location}
                                    onChange={(val) => onChange({ ...currentJob, location: val })}
                                    placeholder="e.g. Kathmandu, Remote"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Job Details</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Job Level</label>
                                <select
                                    value={currentJob.jobLevel}
                                    onChange={(e) => onChange({ ...currentJob, jobLevel: e.target.value })}
                                >
                                    <option value="entry-level">Entry Level</option>
                                    <option value="mid-level">Mid Level</option>
                                    <option value="senior-level">Senior Level</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Employment Type</label>
                                <select
                                    value={currentJob.type}
                                    onChange={(e) => onChange({ ...currentJob, type: e.target.value })}
                                >
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="remote">Remote</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>No. of Openings</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={currentJob.openings}
                                    onChange={(e) => onChange({ ...currentJob, openings: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Salary</label>
                                <input
                                    type="text"
                                    value={currentJob.salary}
                                    onChange={(e) => onChange({ ...currentJob, salary: e.target.value })}
                                    placeholder="e.g. Negotiable, 50k-100k"
                                />
                            </div>
                            <div className="form-group">
                                <label>Industry</label>
                                <input
                                    type="text"
                                    value={currentJob.industry}
                                    onChange={(e) => onChange({ ...currentJob, industry: e.target.value })}
                                    placeholder="e.g. IT, Healthcare"
                                />
                            </div>
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    value={currentJob.expiryDate}
                                    onChange={(e) => onChange({ ...currentJob, expiryDate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Requirements</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Education Level</label>
                                <select
                                    value={currentJob.education}
                                    onChange={(e) => onChange({ ...currentJob, education: e.target.value })}
                                >
                                    <option value="see">SEE</option>
                                    <option value="high-school">High School (+2)</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="bachelor">Bachelor's</option>
                                    <option value="master">Master's</option>
                                    <option value="phd">PhD</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Experience Required</label>
                                <input
                                    type="text"
                                    value={currentJob.experience}
                                    onChange={(e) => onChange({ ...currentJob, experience: e.target.value })}
                                    placeholder="e.g. 2+ years in React"
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Skills (Comma Separated)</label>
                                <input
                                    type="text"
                                    value={currentJob.skills}
                                    onChange={(e) => onChange({ ...currentJob, skills: e.target.value })}
                                    placeholder="e.g. React, Node.js, SQL"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Description</h3>
                        <div className="form-group">
                            <label>Job Description *</label>
                            <RichTextEditor
                                value={currentJob.description}
                                onChange={(value) => onChange({ ...currentJob, description: value })}
                                placeholder="Enter job description with formatting..."
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={onSave}>
                        {isEditing ? 'Update Job' : 'Create Job'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobFormModal;
