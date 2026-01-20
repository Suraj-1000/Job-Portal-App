import { FaEdit, FaTrash } from 'react-icons/fa';

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <table className="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td style={{ fontWeight: 500 }}>
                            {user.firstName} {user.lastName}
                        </td>
                        <td>{user.email}</td>
                        <td style={{ textTransform: 'capitalize' }}>{user.role || 'user'}</td>
                        <td>
                            <span className={`status-badge ${user.status || 'active'}`}>
                                {user.status || 'active'}
                            </span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                <button className="btn-icon edit" onClick={() => onEdit(user)}>
                                    <FaEdit />
                                </button>
                                <button className="btn-icon delete" onClick={() => onDelete(user)}>
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

export default UserTable;
