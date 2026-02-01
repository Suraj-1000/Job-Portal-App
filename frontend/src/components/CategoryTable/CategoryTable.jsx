import { FaEdit, FaTrash } from 'react-icons/fa';


const CategoryTable = ({ items, onEdit, onDelete }) => {
    return (
        <table className="w-full border-collapse text-[0.95rem]">
            <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">ID</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Name</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Status</th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 text-sm uppercase tracking-wide">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 transition-all hover:bg-slate-50 hover:translate-x-0.5">
                        <td className="px-5 py-4 text-slate-600">{item.id}</td>
                        <td className="px-5 py-4 text-slate-600 font-medium">{item.name}</td>
                        <td className="px-5 py-4 text-slate-600">
                            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium capitalize ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                            <div className="flex gap-2">
                                <button className="bg-transparent border-none cursor-pointer p-2 rounded-md text-[1.1rem] text-slate-500 transition-all flex items-center justify-center hover:bg-blue-50 hover:text-blue-500" onClick={() => onEdit(item)}>
                                    <FaEdit />
                                </button>
                                <button className="bg-transparent border-none cursor-pointer p-2 rounded-md text-[1.1rem] text-slate-500 transition-all flex items-center justify-center hover:bg-red-50 hover:text-red-500" onClick={() => onDelete(item)}>
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

export default CategoryTable;
