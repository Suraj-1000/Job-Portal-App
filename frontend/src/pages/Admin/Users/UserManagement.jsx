import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaSearch } from 'react-icons/fa';
import UserTable from '../../../components/UserTable/UserTable';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal/DeleteConfirmationModal';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
        }
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/users/${userToDelete.id}`);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        } finally {
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    const handleEdit = (user) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const handleStatusToggle = async (user) => {
        try {
            const newStatus = user.status === 'active' ? 'inactive' : 'active';
            await axios.patch(`http://localhost:5000/api/users/${user.id}`, {
                status: newStatus
            });
            toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user status:', error);
            toast.error('Failed to update user status');
        }
    };

    const filteredUsers = users.filter(user =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-management-container">
            <div className="admin-table-wrapper">
                <div className="table-header">
                    <h1>User Management</h1>
                    <div className="table-controls">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    {filteredUsers.length === 0 ? (
                        <div className="empty-state">
                            <FaSearch />
                            <h3>No Users Found</h3>
                            <p>No users match your search criteria</p>
                        </div>
                    ) : (
                        <UserTable
                            users={filteredUsers}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                }}
                onConfirm={confirmDelete}
                itemName={userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : ''}
                itemType="user"
            />
        </div>
    );
};

export default UserManagement;
