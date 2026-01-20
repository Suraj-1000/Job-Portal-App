import { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaCheck, FaTimes, FaDownload } from 'react-icons/fa';
import './Applications.css'; // We will create this

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Mock API call
        setLoading(true);
        setTimeout(() => {
            setApplications([
                { id: 1, applicant: 'John Doe', jobTitle: 'React Developer', date: '2023-10-25', status: 'Pending', resume: '#' },
                { id: 2, applicant: 'Jane Smith', jobTitle: 'UX Designer', date: '2023-10-24', status: 'Reviewed', resume: '#' },
                { id: 3, applicant: 'Mike Ross', jobTitle: 'Legal Consultant', date: '2023-10-23', status: 'Rejected', resume: '#' },
                { id: 4, applicant: 'Sarah Connor', jobTitle: 'Security Lead', date: '2023-10-22', status: 'Interview', resume: '#' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setApplications(apps => apps.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return '#f59e0b';
            case 'Reviewed': return '#3b82f6';
            case 'Interview': return '#8b5cf6';
            case 'Rejected': return '#ef4444';
            case 'Hired': return '#10b981';
            default: return '#64748b';
        }
    };

    const filteredApps = applications.filter(app =>
        app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="applications-page">
            <div className="page-header-row">
                <h1>Applications Management</h1>
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search applicant or job..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Applied For</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Resume</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                        ) : filteredApps.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No applications found</td></tr>
                        ) : (
                            filteredApps.map(app => (
                                <tr key={app.id}>
                                    <td>
                                        <div className="applicant-info">
                                            <div className="avatar">{app.applicant.charAt(0)}</div>
                                            <span>{app.applicant}</span>
                                        </div>
                                    </td>
                                    <td>{app.jobTitle}</td>
                                    <td>{app.date}</td>
                                    <td>
                                        <span
                                            className="status-pill"
                                            style={{ backgroundColor: `${getStatusColor(app.status)}20`, color: getStatusColor(app.status) }}
                                        >
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>
                                        <a href={app.resume} className="action-link"><FaDownload /> Download</a>
                                    </td>
                                    <td>
                                        <div className="actions-cell">
                                            <button className="btn-icon" title="View Details"><FaEye /></button>
                                            <button className="btn-icon success" title="Shortlist" onClick={() => handleStatusChange(app.id, 'Interview')}><FaCheck /></button>
                                            <button className="btn-icon danger" title="Reject" onClick={() => handleStatusChange(app.id, 'Rejected')}><FaTimes /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applications;
