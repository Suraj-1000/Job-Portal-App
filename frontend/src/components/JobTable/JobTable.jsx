import { FaEdit, FaTrash } from 'react-icons/fa';
import './JobTable.css';

const JobTable = ({ jobs, onEdit, onDelete }) => {
    return (
        <table className="admin-table">
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Category</th>
                    <th>Level/Type</th>
                    <th>Expiry</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>
                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{job.title}</div>
                            <small style={{ color: '#7f8c8d' }}>Openings: {job.openings}</small>
                        </td>
                        <td>{job.companyName}</td>
                        <td>{job.category?.name || 'Uncategorized'}</td>
                        <td>
                            <div style={{ textTransform: 'capitalize' }}>{job.jobLevel}</div>
                            <small style={{ color: '#7f8c8d', textTransform: 'capitalize' }}>{job.type}</small>
                        </td>
                        <td>{job.expiryDate || 'N/A'}</td>
                        <td>
                            <span className={`status-badge ${job.status}`}>
                                {job.status}
                            </span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                <button className="btn-icon edit" onClick={() => onEdit(job)}>
                                    <FaEdit />
                                </button>
                                <button className="btn-icon delete" onClick={() => onDelete(job)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JobTable;
