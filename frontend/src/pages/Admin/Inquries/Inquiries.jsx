import { useState, useEffect } from 'react';
import { FaSearch, FaEnvelopeOpen, FaReply, FaTrash } from 'react-icons/fa';
import './Inquiries.css'; // We will create this

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    useEffect(() => {
        // Mock API
        setTimeout(() => {
            setInquiries([
                { id: 1, name: 'Alice Walker', email: 'alice@example.com', subject: 'Question about Senior Dev role', message: 'Hi, I was wondering if remote is an option?', date: '2023-10-26', read: false },
                { id: 2, name: 'Bob Builder', email: 'bob@example.com', subject: 'Login issues', message: 'I cannot reset my password.', date: '2023-10-25', read: true },
                { id: 3, name: 'Charlie Day', email: 'charlie@example.com', subject: 'Partnership Inquiry', message: 'We would like to partner with you.', date: '2023-10-24', read: true },
            ]);
        }, 500);
    }, []);

    const handleSelect = (inquiry) => {
        setSelectedInquiry(inquiry);
        // Mark as read logic would go here
        setInquiries(inqs => inqs.map(i => i.id === inquiry.id ? { ...i, read: true } : i));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            setInquiries(inqs => inqs.filter(i => i.id !== id));
            if (selectedInquiry?.id === id) setSelectedInquiry(null);
        }
    };

    return (
        <div className="inquiries-page">
            <h1 className="page-title">Inquiries & Support</h1>

            <div className="inbox-container">
                <div className="inbox-list">
                    <div className="list-header">
                        <input type="text" placeholder="Search messages..." className="list-search" />
                    </div>
                    <div className="message-list">
                        {inquiries.map(inquiry => (
                            <div
                                key={inquiry.id}
                                className={`message-item ${selectedInquiry?.id === inquiry.id ? 'active' : ''} ${!inquiry.read ? 'unread' : ''}`}
                                onClick={() => handleSelect(inquiry)}
                            >
                                <div className="msg-avatar">{inquiry.name.charAt(0)}</div>
                                <div className="msg-preview">
                                    <div className="msg-top">
                                        <h4>{inquiry.name}</h4>
                                        <span className="msg-date">{inquiry.date}</span>
                                    </div>
                                    <p className="msg-subject">{inquiry.subject}</p>
                                    <p className="msg-snippet">{inquiry.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="inbox-content">
                    {selectedInquiry ? (
                        <div className="message-detail">
                            <div className="detail-header">
                                <h2>{selectedInquiry.subject}</h2>
                                <div className="detail-meta">
                                    <span className="detail-sender">From: <strong>{selectedInquiry.name}</strong> &lt;{selectedInquiry.email}&gt;</span>
                                    <span className="detail-date">{selectedInquiry.date}</span>
                                </div>
                                <div className="detail-actions">
                                    <button className="btn-action"><FaReply /> Reply</button>
                                    <button className="btn-action danger" onClick={() => handleDelete(selectedInquiry.id)}><FaTrash /> Delete</button>
                                </div>
                            </div>
                            <div className="detail-body">
                                <p>{selectedInquiry.message}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-selection">
                            <FaEnvelopeOpen className="empty-icon" />
                            <h3>Select a message</h3>
                            <p>Choose a message from the list to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Inquiries;
