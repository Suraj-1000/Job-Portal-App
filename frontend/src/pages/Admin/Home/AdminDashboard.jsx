import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaBriefcase, FaFileAlt, FaStar, FaSpinner } from 'react-icons/fa';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeJobs: 0,
        applications: 0,
        reviews: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);

            // Fetch all data in parallel
            const [usersRes, jobsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/users'),
                axios.get('http://localhost:5000/api/jobs')
            ]);

            // Calculate statistics
            const totalUsers = usersRes.data.length;
            const activeJobs = jobsRes.data.filter(job => job.status === 'active').length;

            // Placeholder for applications and reviews (can be updated when endpoints are available)
            const applications = 0; // TODO: Fetch from /api/applications when available
            const reviews = 0; // TODO: Fetch from /api/reviews when available

            setStats({
                totalUsers,
                activeJobs,
                applications,
                reviews
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: 'Total Users',
            value: stats.totalUsers,
            color: '#6c5ce7',
            icon: FaUsers,
            description: 'Registered users'
        },
        {
            label: 'Active Jobs',
            value: stats.activeJobs,
            color: '#0984e3',
            icon: FaBriefcase,
            description: 'Currently open positions'
        },
        {
            label: 'Applications',
            value: stats.applications,
            color: '#00b894',
            icon: FaFileAlt,
            description: 'Total job applications'
        },
        {
            label: 'Pending Reviews',
            value: stats.reviews,
            color: '#fdcb6e',
            icon: FaStar,
            description: 'Awaiting review'
        }
    ];

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <FaSpinner style={{ fontSize: '3rem', color: '#6c5ce7', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: '#636e72' }}>Loading dashboard statistics...</p>
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p style={{ color: '#636e72', marginBottom: '30px' }}>Overview of your application's performance.</p>

            <div className="dashboard-grid">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3>{stat.label}</h3>
                                    <div className="value" style={{ color: stat.color }}>{stat.value}</div>
                                    <p style={{ fontSize: '0.85rem', color: '#95a5a6', marginTop: '8px' }}>
                                        {stat.description}
                                    </p>
                                </div>
                                <Icon style={{ fontSize: '2.5rem', color: stat.color, opacity: 0.2 }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions or Recent Activity could go here */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '24px' }}>
                <h3>Recent Activity</h3>
                <p style={{ color: '#b2bec3', fontStyle: 'italic' }}>No recent activity to show.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;

