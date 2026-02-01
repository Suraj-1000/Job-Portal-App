import { useState, useEffect } from 'react';
import { FaBriefcase, FaCalendarAlt, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';


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
        const baseClasses = "py-2 px-4 rounded-full text-[0.9rem] font-semibold flex items-center gap-1.5";
        switch (status) {
            case 'pending': return <span className={`${baseClasses} bg-orange-50 text-orange-500`}><FaClock /> Pending</span>;
            case 'reviewed': return <span className={`${baseClasses} bg-emerald-50 text-emerald-500`}><FaCheckCircle /> Reviewed</span>;
            case 'rejected': return <span className={`${baseClasses} bg-red-50 text-red-500`}><FaTimesCircle /> Rejected</span>;
            case 'interview': return <span className={`${baseClasses} bg-blue-50 text-blue-500`}><FaCalendarAlt /> Interview</span>;
            default: return <span className={baseClasses}>{status}</span>;
        }
    };

    return (
        <div className="max-w-[1000px] mx-auto px-5 pb-16 pt-0 font-sans text-slate-900">
            <div className="text-center mb-12">
                <h1 className="text-[2.5rem] text-slate-900 mb-3 font-bold">Applied Jobs</h1>
                <p className="text-slate-500 text-[1.1rem]">Track the status of your job applications</p>
            </div>

            <div className="flex flex-col gap-5">
                {applications.length > 0 ? (
                    applications.map(app => (
                        <div key={app.id} className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-600/10 flex-col sm:flex-row sm:items-center sm:text-left text-left items-start">
                            <div className="w-[60px] h-[60px] rounded-xl bg-slate-100 flex items-center justify-center text-[1.5rem] text-indigo-600 shrink-0">
                                <FaBriefcase />
                            </div>
                            <div className="flex-1">
                                <h3 className="m-0 mb-1.5 text-slate-900 text-[1.2rem] font-bold">{app.job.title}</h3>
                                <p className="text-slate-500 mb-2 font-medium">{app.job.company} • {app.job.location}</p>
                                <div className="flex gap-4 text-[0.9rem] text-slate-400">
                                    <span>Applied on {new Date(app.dateApplied).toLocaleDateString()}</span>
                                    <span>{app.job.type}</span>
                                </div>
                            </div>
                            <div className="mt-2.5 sm:mt-0 self-start sm:self-center">
                                {getStatusBadge(app.status)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl text-slate-500">
                        <div className="text-[3rem] mb-5 text-slate-300 flex justify-center"><FaBriefcase /></div>
                        <h3 className="mb-2 text-lg font-semibold text-slate-700">No Applications Yet</h3>
                        <p>Start applying to jobs to track them here!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppliedJobs;
