import { useState, useEffect } from 'react';
import { FaBriefcase, FaCalendarAlt, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import './AppliedJobs.css';

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Mock data
        const mockApplications = [
            {
                id: 1,
                job: { title: 'Senior Frontend Engineer', company: 'Tech Inc', location: 'Remote', type: 'Full-time' },
                status: 'pending',
                dateApplied: '2023-11-15'
            },
            {
                id: 2,
                job: { title: 'Product Designer', company: 'Creative Studio', location: 'New York, NY', type: 'Full-time' },
                status: 'reviewed',
                dateApplied: '2023-11-10'
            },
            {
                id: 3,
                job: { title: 'Marketing Manager', company: 'Global Brands', location: 'London, UK', type: 'Contract' },
                status: 'rejected',
                dateApplied: '2023-10-28'
            }
        ];
        setApplications(mockApplications);
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <span className="status-badge pending"><FaClock /> Pending</span>;
            case 'reviewed': return <span className="status-badge reviewed"><FaCheckCircle /> Reviewed</span>;
            case 'rejected': return <span className="status-badge rejected"><FaTimesCircle /> Rejected</span>;
            case 'interview': return <span className="status-badge interview"><FaCalendarAlt /> Interview</span>;
            default: return <span className="status-badge">{status}</span>;
        }
    };

    return (
        <div className="applied-jobs-page">
            <div className="page-header">
                <h1>Applied Jobs</h1>
                <p>Track the status of your job applications</p>
            </div>

            <div className="applications-list">
                {applications.length > 0 ? (
                    applications.map(app => (
                        <div key={app.id} className="application-card">
                            <div className="app-job-icon">
                                <FaBriefcase />
                            </div>
                            <div className="app-details">
                                <h3>{app.job.title}</h3>
                                <p className="app-company">{app.job.company} • {app.job.location}</p>
                                <div className="app-meta">
                                    <span>Applied on {new Date(app.dateApplied).toLocaleDateString()}</span>
                                    <span>{app.job.type}</span>
                                </div>
                            </div>
                            <div className="app-status">
                                {getStatusBadge(app.status)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon"><FaBriefcase /></div>
                        <h3>No Applications Yet</h3>
                        <p>Start applying to jobs to track them here!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppliedJobs;
