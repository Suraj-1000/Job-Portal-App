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

const CategoryTable = ({ items, onEdit, onDelete }) => {
    return (
        <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Name</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide">Status</TableHead>
                        <TableHead className="font-semibold text-slate-700 uppercase tracking-wide text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((category) => (
                        <TableRow key={category.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium text-slate-700">{category.name}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={category.status === 'active' ? 'success' : 'secondary'}
                                    className={`capitalize font-medium ${category.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                                >
                                    {category.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-500 hover:text-blue-500 hover:bg-blue-50"
                                        onClick={() => onEdit(category)}
                                    >
                                        <FaEdit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-500 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => onDelete(category)}
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

export default CategoryTable;
