import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaSearch, FaTags, FaIndustry, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import CategoryFormModal from '../../../components/CategoryFormModal/CategoryFormModal';
import CategoryTable from '../../../components/CategoryTable/CategoryTable';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal/DeleteConfirmationModal';

const CategorySetup = () => {
    const [activeTab, setActiveTab] = useState('categories');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [currentItem, setCurrentItem] = useState({ id: null, name: '', status: 'active' });

    // Tab configuration
    const tabs = [
        { id: 'categories', label: 'Categories', icon: FaTags, endpoint: '/api/categories' },
        { id: 'industries', label: 'Industries', icon: FaIndustry, endpoint: '/api/industries' },
        { id: 'locations', label: 'Locations', icon: FaMapMarkerAlt, endpoint: '/api/locations' },
        { id: 'jobtitles', label: 'Job Titles', icon: FaBriefcase, endpoint: '/api/jobtitles' }
    ];

    const currentTabConfig = tabs.find(t => t.id === activeTab);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000${currentTabConfig.endpoint}`);
            setData(response.data);
        } catch (error) {
            console.error(`Error fetching ${activeTab}:`, error);
            toast.error(`Failed to load ${activeTab}`);
        }
    };

    const handleSave = async (formData) => {
        if (!formData.name.trim()) {
            toast.warning('Name is required');
            return;
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000${currentTabConfig.endpoint}/${currentItem.id}`, { ...currentItem, ...formData });
                toast.success(`${currentTabConfig.label.slice(0, -1)} updated successfully`);
            } else {
                await axios.post(`http://localhost:5000${currentTabConfig.endpoint}`, formData);
                toast.success(`${currentTabConfig.label.slice(0, -1)} created successfully`);
            }
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving:', error);
            toast.error(error.response?.data?.message || 'Failed to save');
        }
    };

    const handleDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await axios.delete(`http://localhost:5000${currentTabConfig.endpoint}/${itemToDelete.id}`);
            toast.success(`${currentTabConfig.label.slice(0, -1)} deleted successfully`);
            fetchData();
        } catch (error) {
            console.error('Error deleting:', error);
            toast.error('Failed to delete');
        } finally {
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setCurrentItem({ id: null, name: '', status: 'active' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentItem({ id: null, name: '', status: 'active' });
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="filter-management-container">
            {/* Tab Navigation */}
            <div className="tabs-container">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSearchTerm('');
                            }}
                        >
                            <Icon /> {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Table Wrapper */}
            <div className="admin-table-wrapper">
                <div className="table-header">
                    <h1>{currentTabConfig.label} Management</h1>
                    <div className="table-controls">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder={`Search ${currentTabConfig.label.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn-primary" onClick={handleAddNew}>
                            <FaPlus /> Add {currentTabConfig.label.slice(0, -1)}
                        </button>
                    </div>
                </div>

                <div className="table-container">
                    {filteredData.length === 0 ? (
                        <div className="empty-state">
                            <currentTabConfig.icon />
                            <h3>No {currentTabConfig.label} Found</h3>
                            <p>Get started by adding your first {currentTabConfig.label.toLowerCase().slice(0, -1)}</p>
                        </div>
                    ) : (
                        <CategoryTable
                            items={filteredData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>

            <CategoryFormModal
                isOpen={showModal}
                isEditing={isEditing}
                currentItem={currentItem}
                onClose={handleCloseModal}
                onSave={handleSave}
                entityName={currentTabConfig.label.slice(0, -1)}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                }}
                onConfirm={confirmDelete}
                itemName={itemToDelete?.name}
                itemType={currentTabConfig.label.toLowerCase().slice(0, -1)}
            />
        </div>
    );
};

export default CategorySetup;
