import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './JobCard.css';

const JobCard = ({ job }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const navigate = useNavigate();

    const handleFavoriteToggle = async (e) => {
        e.stopPropagation();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add favorites');
            navigate('/login');
            return;
        }

        try {
            if (isFavorite) {
                // Remove from favorites
                const response = await fetch(`http://localhost:5000/api/user/favorites/${job.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setIsFavorite(false);
                    toast.success('Removed from favorites');
                }
            } else {
                // Add to favorites
                const response = await fetch('http://localhost:5000/api/user/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ jobId: job.id })
                });

                if (response.ok) {
                    setIsFavorite(true);
                    toast.success('Added to favorites');
                } else {
                    const data = await response.json();
                    toast.error(data.message || 'Failed to add to favorites');
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('An error occurred');
        }
    };

    const handleApply = async (e) => {
        e.stopPropagation();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to apply for jobs');
            navigate('/login');
            return;
        }

        setIsApplying(true);
        try {
            const response = await fetch('http://localhost:5000/api/user/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ jobId: job.id })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Application submitted successfully!');
            } else {
                toast.error(data.message || 'Failed to apply');
            }
        } catch (error) {
            console.error('Error applying for job:', error);
            toast.error('An error occurred');
        } finally {
            setIsApplying(false);
        }
    };

    const handleCardClick = () => {
        // Navigate to job details page (to be implemented)
        // navigate(`/user/jobs/${job.id}`);
    };

    return (
        <div className="job-card" onClick={handleCardClick}>
            <div className="job-card-header">
                <div className="job-title-section">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="company-name">{job.companyName}</p>
                </div>
                <button
                    className="favorite-btn"
                    onClick={handleFavoriteToggle}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? <FaHeart className="favorite-icon active" /> : <FaRegHeart className="favorite-icon" />}
                </button>
            </div>

            <div className="job-details">
                <div className="job-detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{job.location || 'Not specified'}</span>
                </div>
                <div className="job-detail-item">
                    <FaBriefcase className="detail-icon" />
                    <span>{job.type || 'Full-time'}</span>
                </div>
                {job.salary && (
                    <div className="job-detail-item">
                        <FaDollarSign className="detail-icon" />
                        <span>{job.salary}</span>
                    </div>
                )}
            </div>

            {job.category && (
                <div className="job-category">
                    <span className="category-badge">{job.category.name}</span>
                </div>
            )}

            <div className="job-description">
                <p>{job.description?.substring(0, 120)}...</p>
            </div>

            <div className="job-card-footer">
                <button
                    className="apply-btn"
                    onClick={handleApply}
                    disabled={isApplying}
                >
                    {isApplying ? 'Applying...' : 'Apply Now'}
                </button>
            </div>
        </div>
    );
};

export default JobCard;
