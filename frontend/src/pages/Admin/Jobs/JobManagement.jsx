import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaSearch } from 'react-icons/fa';
import JobFormModal from '../../../components/JobFormModal/JobFormModal';
import JobTable from '../../../components/JobTable/JobTable';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal/DeleteConfirmationModal';

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [currentJob, setCurrentJob] = useState({
        id: null,
        title: '',
        companyName: '',
        location: '',
        salary: '',
        type: 'full-time',
        status: 'active',
        categoryId: '',
        description: '',
        openings: 1,
        industry: '',
        jobLevel: 'entry-level',
        education: 'see',
        experience: '',
        expiryDate: '',
        skills: ''
    });

    useEffect(() => {
        fetchJobs();
        fetchCategories();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSave = async (jobData) => {
        try {
            // Processing openings to ensure it's a number (react-hook-form handles number inputs as strings sometimes if not coerced)
            // But we used type="number" and Joi.number(), so it should be fine or Joi will handle validation. 
            // However, ensure it's an integer before sending if API expects it.
            const payload = { ...jobData, openings: parseInt(jobData.openings) || 1 };

            if (isEditing) {
                await axios.put(`http://localhost:5000/api/jobs/${currentJob.id}`, payload);
                toast.success('Job updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/jobs', payload);
                toast.success('Job created successfully');
            }
            fetchJobs();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving job:', error);
            toast.error('Failed to save job');
        }
    };

    const handleDelete = (job) => {
        setJobToDelete(job);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!jobToDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/jobs/${jobToDelete.id}`);
            toast.success('Job deleted successfully');
            fetchJobs();
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error('Failed to delete job');
        } finally {
            setShowDeleteModal(false);
            setJobToDelete(null);
        }
    };

    const handleEdit = (job) => {
        setCurrentJob({
            ...job,
            categoryId: job.categoryId || '',
            openings: job.openings || 1,
            industry: job.industry || '',
            jobLevel: job.jobLevel || 'entry-level',
            education: job.education || 'see',
            experience: job.experience || '',
            expiryDate: job.expiryDate || '',
            skills: job.skills || ''
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setCurrentJob({
            id: null,
            title: '',
            companyName: '',
            location: '',
            salary: '',
            type: 'full-time',
            status: 'active',
            categoryId: '',
            description: '',
            openings: 1,
            industry: '',
            jobLevel: 'entry-level',
            education: 'see',
            experience: '',
            expiryDate: '',
            skills: ''
        });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="job-management-container">
            <div className="admin-table-wrapper">
                <div className="table-header">
                    <h1>Job Management</h1>
                    <div className="table-controls">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn-primary" onClick={handleAddNew}>
                            <FaPlus /> Post New Job
                        </button>
                    </div>
                </div>

                <div className="table-container">
                    {filteredJobs.length === 0 ? (
                        <div className="empty-state">
                            <FaSearch />
                            <h3>No Jobs Found</h3>
                            <p>Start by posting your first job</p>
                        </div>
                    ) : (
                        <JobTable
                            jobs={filteredJobs}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

            <JobFormModal
                isOpen={showModal}
                isEditing={isEditing}
                currentJob={currentJob}
                categories={categories}
                onClose={handleCloseModal}
                onSave={handleSave}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setJobToDelete(null);
                }}
                onConfirm={confirmDelete}
                itemName={jobToDelete?.title}
                itemType="job"
            />
        </div>
    );
};

export default JobManagement;
