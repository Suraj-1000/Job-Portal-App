import { Link } from 'react-router-dom';
import {
    FaSearch,
    FaBriefcase,
    FaUsers,
    FaChartLine,
    FaArrowRight,
    FaRegUser,
    FaRegPaperPlane,
    FaRegCheckCircle,
    FaLaptopCode,
    FaHeartbeat,
    FaMoneyBillWave,
    FaBook,
    FaHotel,
    FaPalette,
    FaHeadset
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const categories = [
        { name: 'IT & Software', count: 124, icon: <FaLaptopCode />, color: '#667eea' },
        { name: 'Healthcare', count: 78, icon: <FaHeartbeat />, color: '#00b894' },
        { name: 'Marketing & Sales', count: 52, icon: <FaChartLine />, color: '#fd79a8' },
        { name: 'Finance & Accounting', count: 41, icon: <FaMoneyBillWave />, color: '#fdcb6e' },
        { name: 'Education', count: 35, icon: <FaBook />, color: '#74b9ff' },
        { name: 'Hospitality', count: 29, icon: <FaHotel />, color: '#a29bfe' },
        { name: 'Design & Art', count: 18, icon: <FaPalette />, color: '#e17055' },
        { name: 'Customer Service', count: 64, icon: <FaHeadset />, color: '#0984e3' }
    ];

    const stats = [
        { label: 'Active Jobs', value: '350+', icon: FaBriefcase, color: '#4f46e5' },
        { label: 'Companies', value: '120+', icon: FaUsers, color: '#10b981' },
        { label: 'Success Rate', value: '94%', icon: FaChartLine, color: '#f59e0b' }
    ];

    const steps = [
        { title: 'Create Account', desc: 'Sign up and complete your profile to get started.', icon: FaRegUser },
        { title: 'Search Jobs', desc: 'Browse through thousands of job listings in your industry.', icon: FaSearch },
        { title: 'Upload CV', desc: 'Upload your best CV/Resume to attract recruiters.', icon: FaRegPaperPlane },
        { title: 'Get Hired', desc: 'Apply to jobs and get hired by top companies.', icon: FaRegCheckCircle },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-shape"></div>
                <div className="hero-content">
                    <span className="hero-badge">#1 Job Board</span>
                    <h1 className="hero-title">
                        Find Your <span className="gradient-text">Dream Job</span><br />
                        Build Your Future
                    </h1>
                    <p className="hero-subtitle">
                        Connecting talent with opportunity. Discover thousands of job openings
                        from top companies and startups. Your next big career move starts here.
                    </p>

                    {/* Search Bar */}
                    <div className="hero-search">
                        <div className="search-input-wrapper">

                            <input
                                type="text"
                                placeholder="Job title, keywords, or company..."
                                className="search-input"
                            />
                        </div>
                        <Link to="/user/find-jobs" className="search-button">
                            Search

                        </Link>

                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-icon-wrapper" style={{ background: `${stat.color}15`, color: stat.color }}>
                                    <stat.icon />
                                </div>
                                <div>
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image Collage */}
                <div className="hero-image-container">
                    <div className="hero-collage">
                        {/* Connecting Arrows - Specific Colors from Image */}
                        <svg className="collage-arrows" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                            {/* Path 1: Search (Right) -> Offer (Left) - BLUE */}
                            <path d="M200 120 C 250 120, 350 120, 400 120" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="8 6" className="arrow-path" />
                            <circle cx="200" cy="120" r="4" fill="#4f46e5" />
                            <circle cx="400" cy="120" r="4" fill="#4f46e5" />

                            {/* Path 2: Offer (Bottom) -> Commute (Top) - GREEN */}
                            <path d="M480 220 C 480 280, 160 250, 160 300" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="8 6" className="arrow-path" />
                            <circle cx="480" cy="220" r="4" fill="#10b981" />
                            <circle cx="160" cy="300" r="4" fill="#10b981" />

                            {/* Path 3: Commute (Right) -> Work (Left) - ORANGE */}
                            <path d="M240 400 C 300 400, 320 450, 380 480" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 6" className="arrow-path" />
                            <circle cx="240" cy="400" r="4" fill="#f59e0b" />
                            <circle cx="380" cy="480" r="4" fill="#f59e0b" />
                        </svg>

                        <div className="hero-img-card card-searching">
                            <img src="/assets/hero/hero-searching.png" alt="Searching" />
                            <div className="card-badge badge-search">Searching</div>
                            <div className="connect-dot dot-search-out"></div>
                        </div>

                        <div className="hero-img-card card-offer">
                            <div className="connect-dot dot-offer-in"></div>
                            <div className="card-badge badge-offer">Got Offer!</div>
                            <img src="/assets/hero/hero-offer.png" alt="Offer" />
                            <div className="connect-dot dot-offer-out"></div>
                        </div>

                        <div className="hero-img-card card-commute">
                            <div className="connect-dot dot-commute-in"></div>
                            <img src="/assets/hero/hero-commute.png" alt="Commute" />
                            <div className="card-badge badge-commute">Commuting</div>
                            <div className="connect-dot dot-commute-out"></div>
                        </div>

                        <div className="hero-img-card card-working">
                            <div className="connect-dot dot-work-in"></div>
                            <img src="/assets/hero/hero-working.png" alt="Working" />
                            <div className="card-badge badge-work">Working</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Explore by Category</h2>
                    <p className="section-subtitle">
                        Deep dive into the industry of your choice. We have jobs for every skill set.
                    </p>

                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/user/find-jobs?category=${encodeURIComponent(category.name)}`}
                                className="category-card"
                                style={{ '--theme-color': category.color }}
                            >
                                <div className="card-bg-decoration"></div>
                                <div className="category-icon">
                                    {category.icon}
                                </div>
                                <h3 className="category-name">{category.name}</h3>
                                <div className="category-count">
                                    <span>{category.count} jobs open</span>
                                    <div className="arrow-wrapper">
                                        <FaArrowRight className="arrow-icon" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">
                        We make it easy to find and apply for jobs. Follow these simple steps.
                    </p>

                    <div className="steps-grid">
                        {steps.map((step, index) => (
                            <div key={index} className="step-card">
                                <div className="step-number">{index + 1}</div>
                                <step.icon className="step-icon" />
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-overlay"></div>
                <div className="cta-content">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>
                        Join thousands of job seekers who have successfully found their
                        dream jobs through our platform.
                    </p>
                    <Link to="/user/find-jobs" className="cta-button">
                        Explore All Jobs
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
