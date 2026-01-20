import { useState, useEffect } from 'react';
import { FaHeart, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import JobCard from '../../../components/JobCard/JobCard';
import './FavoriteJobs.css';

const FavoriteJobs = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetch
        setTimeout(() => {
            setFavorites([
                {
                    id: 1,
                    title: 'Senior React Developer',
                    companyName: 'Tech Corp',
                    location: 'Remote',
                    type: 'Full-time',
                    salary: '$120k - $150k',
                    description: 'We are looking for an experienced professional...',
                    category: { name: 'IT & Software' }
                },
                {
                    id: 2,
                    title: 'UX Designer',
                    companyName: 'Design Studio',
                    location: 'New York, NY',
                    type: 'Contract',
                    salary: '$80k - $100k',
                    description: 'Creative designer needed for a fast-paced agency...',
                    category: { name: 'Design & Art' }
                }
            ]);
            setLoading(false);
        }, 600);
    }, []);

    return (
        <div className="favorites-page">
            <div className="page-header">
                <h1><FaHeart className="header-icon" /> Saved Jobs</h1>
                <p>Jobs you'vebookmarked for later</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                </div>
            ) : favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon"><FaHeart /></div>
                    <h3>No Saved Jobs</h3>
                    <p>When you see a job you like, click the heart icon to save it here.</p>
                    <Link to="/user/find-jobs" className="btn-browse">
                        Browse Jobs <FaArrowRight />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FavoriteJobs;
