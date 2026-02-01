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

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <div className="rounded-md border border-slate-200 overflow-hidden bg-white">
            <Table>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="w-[80px] font-semibold text-slate-700">ID</TableHead>
                        <TableHead className="font-semibold text-slate-700">Name</TableHead>
                        <TableHead className="font-semibold text-slate-700">Email</TableHead>
                        <TableHead className="font-semibold text-slate-700">Role</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium text-slate-600">{user.id}</TableCell>
                            <TableCell className="font-semibold text-slate-700">
                                {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell className="text-slate-600">{user.email}</TableCell>
                            <TableCell className="capitalize text-slate-600">{user.role || 'user'}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={user.status === 'active' ? 'success' : 'secondary'}
                                    className={`capitalize font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                                >
                                    {user.status || 'active'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-500 hover:text-blue-500 hover:bg-blue-50"
                                        onClick={() => onEdit(user)}
                                    >
                                        <FaEdit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-500 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => onDelete(user)}
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

export default UserTable;
