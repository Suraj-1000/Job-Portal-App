import { FaBullseye, FaHandshake, FaLightbulb, FaUsers } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-page">
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>Connecting Talent with <span className="highlight">Greatness</span></h1>
                    <p>We are on a mission to revolutionize the way people find jobs and companies build teams.</p>
                </div>
            </section>

            {/* Values */}
            <section className="values-section">
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon"><FaBullseye /></div>
                        <h3>Our Mission</h3>
                        <p>To empower every professional to achieve more and help organizations find the best talent.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon"><FaLightbulb /></div>
                        <h3>Innovation</h3>
                        <p>We constantly push boundaries to create smart, intuitive, and efficient recruitment solutions.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon"><FaHandshake /></div>
                        <h3>Trust</h3>
                        <p>Building a platform based on transparency, reliability, and mutual respect.</p>
                    </div>
                </div>
            </section>

            {/* Stats/Team */}
            <section className="team-section">
                <div className="team-text">
                    <h2>Built by Passionate People</h2>
                    <p>
                        Founded in 2024, JobPortal has grown from a small startup to a leading job board.
                        Our diverse team of experts is dedicated to making the hiring process smooth and enjoyable.
                    </p>

                    <div className="mini-stats">
                        <div className="mini-stat">
                            <strong>10k+</strong>
                            <span>Success Stories</span>
                        </div>
                        <div className="mini-stat">
                            <strong>500+</strong>
                            <span>Partner Companies</span>
                        </div>
                    </div>
                </div>
                <div className="team-image-placeholder">
                    <FaUsers className="team-icon-large" />
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
