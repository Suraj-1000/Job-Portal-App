import { FaEdit, FaTrash } from 'react-icons/fa';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const JobTable = ({ jobs, onEdit, onDelete }) => {
    return (
        <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Job Title</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Company</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Category</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Level/Type</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Expiry</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Status</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium text-slate-600">
                                <div className="font-semibold mb-1">{job.title}</div>
                                <small className="text-slate-500">Openings: {job.openings}</small>
                            </TableCell>
                            <TableCell className="text-slate-600">{job.companyName}</TableCell>
                            <TableCell className="text-slate-600">{job.category?.name || 'Uncategorized'}</TableCell>
                            <TableCell className="text-slate-600">
                                <div className="capitalize">{job.jobLevel}</div>
                                <small className="text-slate-500 capitalize">{job.type}</small>
                            </TableCell>
                            <TableCell className="text-slate-600">{job.expiryDate || 'N/A'}</TableCell>
                            <TableCell className="text-slate-600">
                                <Badge
                                    variant={job.status === 'active' ? 'success' : 'secondary'}
                                    className={`capitalize font-medium ${job.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                                >
                                    {job.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-slate-600">
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-slate-500 hover:text-blue-500 hover:bg-blue-50"
                                        onClick={() => onEdit(job)}
                                    >
                                        <FaEdit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-slate-500 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => onDelete(job)}
                                    >
                                        <FaTrash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default JobTable;
