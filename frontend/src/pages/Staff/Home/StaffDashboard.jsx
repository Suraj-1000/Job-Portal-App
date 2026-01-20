import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBriefcase, FaFileAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const StaffDashboard = () => {
    const [stats, setStats] = useState({
        activeJobs: 0,
        applications: 0,
        inquiries: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch active jobs
                const jobsRes = await axios.get('http://localhost:5000/api/jobs');
                const activeJobs = jobsRes.data.filter(job => job.status === 'active').length;

                setStats({
                    activeJobs: activeJobs,
                    applications: 0, // Mock for now
                    inquiries: 0 // Mock for now
                });
            } catch (error) {
                console.error("Error fetching staff stats", error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Active Jobs', value: stats.activeJobs, icon: <FaBriefcase />, color: '#4f46e5' },
        { title: 'Pending Applications', value: stats.applications, icon: <FaFileAlt />, color: '#10b981' },
        { title: 'Unread Inquiries', value: stats.inquiries, icon: <FaEnvelope />, color: '#f59e0b' },
        { title: 'Tasks Due', value: '0', icon: <FaClock />, color: '#ef4444' }
    ];

    return (
        <div>
            <h1>Staff Dashboard</h1>
            <p style={{ color: '#636e72', marginBottom: '30px' }}>Welcome back! Here is an overview of your activities.</p>

            <div className="dashboard-grid">
                {statCards.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3>{stat.title}</h3>
                                <div className="value" style={{ color: stat.color }}>{stat.value}</div>
                            </div>
                            <div style={{ fontSize: '2.5rem', color: stat.color, opacity: 0.2 }}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '24px' }}>
                <h3>Recent Activity</h3>
                <div className="activity-list">
                    <p style={{ color: '#b2bec3', fontStyle: 'italic', marginTop: '10px' }}>No recent activity to show.</p>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
