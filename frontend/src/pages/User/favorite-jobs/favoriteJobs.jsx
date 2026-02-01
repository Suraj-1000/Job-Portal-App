import { useState, useEffect } from 'react';
import { FaHeart, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import JobCard from '../../../components/JobCard/JobCard';


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
        <div className="max-w-[1200px] mx-auto px-5 pb-16 pt-0 font-sans text-slate-900">
            <div className="text-center mb-12">
                <h1 className="text-[2.5rem] text-slate-900 mb-3 font-bold flex items-center justify-center gap-3">
                    <FaHeart className="text-red-500" /> Saved Jobs
                </h1>
                <p className="text-slate-500 text-[1.1rem]">Jobs you've bookmarked for later</p>
            </div>

            {loading ? (
                <div className="text-center py-16">
                    <div className="w-10 h-10 border-[3px] border-slate-200 border-t-indigo-600 rounded-full inline-block animate-spin"></div>
                </div>
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
                    {favorites.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-5 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="text-[3rem] text-slate-300 mb-5 flex justify-center"><FaHeart /></div>
                    <h3 className="text-2xl text-slate-900 mb-2.5 font-bold">No Saved Jobs</h3>
                    <p className="text-slate-500 max-w-[400px] mx-auto mb-6">When you see a job you like, click the heart icon to save it here.</p>
                    <Link to="/user/find-jobs" className="inline-flex items-center gap-2.5 bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold transition-all duration-200 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-md no-underline">
                        Browse Jobs <FaArrowRight />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FavoriteJobs;
