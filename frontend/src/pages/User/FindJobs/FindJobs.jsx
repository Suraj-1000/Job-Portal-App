import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaFilter, FaBriefcase } from 'react-icons/fa';
import JobCard from '../../../components/JobCard/JobCard';
import LocationSearchInput from '../../../components/LocationInput/LocationSearchInput';
import './FindJobs.css';

const FindJobs = () => {
    const location = useLocation();
    const [jobs, setJobs] = useState([]); // In real app, fetch from API
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) setCategoryFilter(category);

        // Mock fetch
        setLoading(true);
        setTimeout(() => {
            const mockJobs = Array.from({ length: 8 }).map((_, i) => ({
                id: i + 1,
                title: ['Senior React Developer', 'UX Designer', 'Product Manager', 'Data Scientist'][i % 4],
                companyName: ['Tech Corp', 'Design Studio', 'Innovate Inc', 'Data Flow'][i % 4],
                location: ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK'][i % 4],
                type: ['Full-time', 'Contract', 'Full-time', 'Part-time'][i % 4],
                salary: ['$120k - $150k', '$80k - $100k', '$130k - $160k', '$90k - $120k'][i % 4],
                description: 'We are looking for an experienced professional to join our growing team. You will be working on exciting projects with cutting-edge technologies.',
                category: { name: ['IT & Software', 'Design & Art', 'Management', 'Data Science'][i % 4] }
            }));
            setJobs(mockJobs);
            setLoading(false);
        }, 800);
    }, [location.search]);

    return (
        <div className="find-jobs-page">
            <div className="find-jobs-header">
                <div className="header-bg"></div>
                <div className="header-content">
                    <h1>Find Your Next <span className="highlight">Opportunity</span></h1>
                    <p>Search through thousands of active job listings</p>

                    <div className="search-bar-container">
                        <div className="search-input-group">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="divider"></div>
                        <div className="search-input-group">
                            <FaMapMarkerAlt className="search-icon" />
                            <div style={{ width: '100%' }}>
                                <LocationSearchInput
                                    value={locationFilter}
                                    onChange={setLocationFilter}
                                    placeholder="Location"
                                />
                            </div>
                        </div>
                        <button className="search-btn">Search</button>
                    </div>
                </div>
            </div>

            <div className="find-jobs-container">
                {/* Sidebar Filters */}
                <aside className="filters-sidebar">
                    <div className="filters-header">
                        <h3><FaFilter /> Filters</h3>
                        <button className="clear-filters">Clear</button>
                    </div>

                    <div className="filter-group">
                        <label>Job Type</label>
                        <div className="checkbox-group">
                            {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(type => (
                                <label key={type} className="checkbox-label">
                                    <input type="checkbox" /> {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Experience Level</label>
                        <div className="checkbox-group">
                            {['Entry Level', 'Mid Level', 'Senior Level', 'Lead'].map(level => (
                                <label key={level} className="checkbox-label">
                                    <input type="checkbox" /> {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Date Posted</label>
                        <select className="filter-select">
                            <option>Anytime</option>
                            <option>Past 24 hours</option>
                            <option>Past Week</option>
                            <option>Past Month</option>
                        </select>
                    </div>
                </aside>

                {/* Job Listing */}
                <main className="jobs-content">
                    <div className="jobs-header-row">
                        <h2>{jobs.length} Jobs Found</h2>
                        <div className="sort-wrapper">
                            <span>Sort by: </span>
                            <select>
                                <option>Most Relevant</option>
                                <option>Newest</option>
                                <option>Salary (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Finding the best jobs for you...</p>
                        </div>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default FindJobs;
