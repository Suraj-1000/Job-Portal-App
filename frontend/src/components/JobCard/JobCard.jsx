import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
        <Card
            className="transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/10 hover:border-[#667eea] group h-full flex flex-col"
            onClick={handleCardClick}
        >
            <CardHeader className="relative pb-3">
                <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 mb-1.5 leading-snug lg:text-base">{job.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500 m-0">{job.companyName}</CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-transparent hover:scale-110 transition-transform -mr-2 -mt-2"
                        onClick={handleFavoriteToggle}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorite ? <FaHeart className="text-xl text-red-600" /> : <FaRegHeart className="text-xl text-gray-300 group-hover:text-gray-400" />}
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="flex-1 pb-4">
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-[#667eea]" />
                        <span>{job.location || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaBriefcase className="text-[#667eea]" />
                        <span>{job.type || 'Full-time'}</span>
                    </div>
                    {job.salary && (
                        <div className="flex items-center gap-1.5">
                            <FaDollarSign className="text-[#667eea]" />
                            <span>{job.salary}</span>
                        </div>
                    )}
                </div>

                {job.category && (
                    <div className="flex gap-2 flex-wrap mb-4">
                        <Badge variant="secondary" className="font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none">
                            {job.category.name}
                        </Badge>
                    </div>
                )}

                <div className="text-gray-500 text-sm leading-relaxed">
                    <p className="m-0 line-clamp-3">{job.description?.replace(/<[^>]*>?/gm, '').substring(0, 120)}...</p>
                </div>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    className="w-full bg-[#667eea] hover:bg-[#5568d3]"
                    onClick={handleApply}
                    disabled={isApplying}
                >
                    {isApplying ? 'Applying...' : 'Apply Now'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default JobCard;
