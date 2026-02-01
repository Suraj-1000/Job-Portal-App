import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaFilter, FaBriefcase } from 'react-icons/fa';
import JobCard from '../../../components/JobCard/JobCard';
import LocationSearchInput from '../../../components/LocationInput/LocationSearchInput';


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

        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
            <div className="relative overflow-hidden bg-slate-900 text-white py-16 px-5 text-center mb-10">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_100%_0%,rgba(79,70,229,0.5)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(16,185,129,0.5)_0%,transparent_50%)]"></div>
                <div className="relative z-10 max-w-[800px] mx-auto">
                    <h1 className="text-[2.5rem] font-bold mb-3">Find Your Next <span className="text-emerald-500">Opportunity</span></h1>
                    <p className="text-slate-400 text-[1.1rem] mb-10">Search through thousands of active job listings</p>

                    <div className="bg-white p-2 rounded-full flex items-center shadow-lg max-w-[900px] mx-auto">
                        <div className="flex-1 flex items-center px-5">
                            <FaSearch className="text-slate-400 mr-3 text-[1.2rem]" />
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border-none outline-none text-base text-slate-700 bg-transparent placeholder:text-slate-400"
                            />
                        </div>
                        <div className="w-px h-[30px] bg-slate-200"></div>
                        <div className="flex-1 flex items-center px-5">
                            <FaMapMarkerAlt className="text-slate-400 mr-3 text-[1.2rem]" />
                            <div className="w-full">
                                <LocationSearchInput
                                    value={locationFilter}
                                    onChange={setLocationFilter}
                                    placeholder="Location"
                                />
                            </div>
                        </div>
                        <button className="bg-indigo-600 text-white border-none py-3 px-8 rounded-full font-semibold cursor-pointer transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-px text-[1rem]">Search</button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
                {/* Sidebar Filters */}
                <aside className="bg-white rounded-2xl p-6 h-fit shadow-sm sticky top-[100px] hidden lg:block">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                        <h3 className="flex items-center gap-2 text-[1.1rem] text-slate-900 font-semibold"><FaFilter className="text-indigo-600" /> Filters</h3>
                        <button className="bg-transparent border-none text-indigo-600 text-sm cursor-pointer hover:underline font-medium">Clear</button>
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold mb-3 text-slate-700 text-[0.95rem]">Job Type</label>
                        <div className="flex flex-col gap-2.5">
                            {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(type => (
                                <label key={type} className="flex items-center gap-2.5 text-slate-500 text-[0.95rem] cursor-pointer font-normal hover:text-indigo-600 transition-colors">
                                    <input type="checkbox" className="accent-indigo-600 w-4 h-4" /> {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold mb-3 text-slate-700 text-[0.95rem]">Experience Level</label>
                        <div className="flex flex-col gap-2.5">
                            {['Entry Level', 'Mid Level', 'Senior Level', 'Lead'].map(level => (
                                <label key={level} className="flex items-center gap-2.5 text-slate-500 text-[0.95rem] cursor-pointer font-normal hover:text-indigo-600 transition-colors">
                                    <input type="checkbox" className="accent-indigo-600 w-4 h-4" /> {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold mb-3 text-slate-700 text-[0.95rem]">Date Posted</label>
                        <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all bg-white">
                            <option>Anytime</option>
                            <option>Past 24 hours</option>
                            <option>Past Week</option>
                            <option>Past Month</option>
                        </select>
                    </div>
                </aside>

                {/* Job Listing */}
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl text-slate-900 font-bold">{jobs.length} Jobs Found</h2>
                        <div className="flex items-center text-slate-600">
                            <span>Sort by: </span>
                            <select className="ml-2.5 p-2 bg-white border border-slate-300 rounded-md outline-none text-slate-600 focus:border-indigo-500">
                                <option>Most Relevant</option>
                                <option>Newest</option>
                                <option>Salary (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-16 text-slate-500">
                            <div className="w-12 h-12 border-[3px] border-slate-200 border-t-indigo-600 rounded-full mx-auto mb-5 animate-spin"></div>
                            <p className="font-medium text-lg">Finding the best jobs for you...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
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
