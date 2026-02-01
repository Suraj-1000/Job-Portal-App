import { FaEdit, FaTrash } from 'react-icons/fa';


const JobTable = ({ jobs, onEdit, onDelete }) => {
    return (
        <table className="w-full border-collapse text-[0.95rem]">
            <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Job Title</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Company</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Category</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Level/Type</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Expiry</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Status</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-slate-100 transition-all hover:bg-slate-50 hover:translate-x-0.5">
                        <td className="px-5 py-4 text-slate-600">
                            <div className="font-semibold mb-1">{job.title}</div>
                            <small className="text-slate-500">Openings: {job.openings}</small>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{job.companyName}</td>
                        <td className="px-5 py-4 text-slate-600">{job.category?.name || 'Uncategorized'}</td>
                        <td className="px-5 py-4 text-slate-600">
                            <div className="capitalize">{job.jobLevel}</div>
                            <small className="text-slate-500 capitalize">{job.type}</small>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{job.expiryDate || 'N/A'}</td>
                        <td className="px-5 py-4 text-slate-600">
                            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium capitalize ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {job.status}
                            </span>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                            <div className="flex gap-2">
                                <button className="bg-transparent border-none cursor-pointer p-2 rounded-md text-[1.1rem] text-slate-500 transition-all flex items-center justify-center hover:bg-blue-50 hover:text-blue-500" onClick={() => onEdit(job)}>
                                    <FaEdit />
                                </button>
                                <button className="bg-transparent border-none cursor-pointer p-2 rounded-md text-[1.1rem] text-slate-500 transition-all flex items-center justify-center hover:bg-red-50 hover:text-red-500" onClick={() => onDelete(job)}>
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
