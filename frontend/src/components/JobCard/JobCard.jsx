import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';


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
        <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col gap-4 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/10 hover:border-[#667eea] md:p-5" onClick={handleCardClick}>
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1.5 leading-snug md:text-base">{job.title}</h3>
                    <p className="text-sm text-gray-500 m-0">{job.companyName}</p>
                </div>
                <button
                    className="bg-none border-none p-2 cursor-pointer transition-transform duration-200 hover:scale-110"
                    onClick={handleFavoriteToggle}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? <FaHeart className="text-xl transition-colors duration-200 text-red-600" /> : <FaRegHeart className="text-xl transition-colors duration-200 text-gray-300" />}
                </button>
            </div>

            <div className="flex flex-wrap gap-4 md:flex-col md:gap-3">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-[#667eea] text-sm" />
                    <span>{job.location || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <FaBriefcase className="text-[#667eea] text-sm" />
                    <span>{job.type || 'Full-time'}</span>
                </div>
                {job.salary && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <FaDollarSign className="text-[#667eea] text-sm" />
                        <span>{job.salary}</span>
                    </div>
                )}
            </div>

            {job.category && (
                <div className="flex gap-2 flex-wrap">
                    <span className="inline-block px-3 py-1.5 bg-indigo-50 text-[#667eea] rounded-md text-xs font-medium">{job.category.name}</span>
                </div>
            )}

            <div className="text-gray-500 text-sm leading-relaxed">
                <p className="m-0">{job.description?.substring(0, 120)}...</p>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                    className="w-full py-3 px-6 bg-[#667eea] text-white border-none rounded-lg text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#5568d3] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#667eea]/30 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
