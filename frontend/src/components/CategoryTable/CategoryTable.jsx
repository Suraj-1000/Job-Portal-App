import { FaEdit, FaTrash } from 'react-icons/fa';
import "./CategoryTable.css";

const CategoryTable = ({ items, onEdit, onDelete }) => {
    return (
        <table className="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td style={{ fontWeight: 500 }}>{item.name}</td>
                        <td>
                            <span className={`status-badge ${item.status}`}>
                                {item.status}
                            </span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                <button className="btn-icon edit" onClick={() => onEdit(item)}>
                                    <FaEdit />
                                </button>
                                <button className="btn-icon delete" onClick={() => onDelete(item)}>
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
