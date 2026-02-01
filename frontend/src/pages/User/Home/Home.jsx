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
        <div className="font-sans text-slate-900 bg-slate-50 overflow-x-hidden">
            <style>{`
                @keyframes dash {
                    to { stroke-dashoffset: 1000; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
            `}</style>

            {/* Hero Section */}
            <section className="relative px-5 pb-10 pt-5 bg-gradient-to-br from-sky-50 to-indigo-50 overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center gap-10 max-w-[1400px] mx-auto min-h-[600px]">
                <div className="absolute -top-[10%] -right-[5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(79,70,229,0.1)_0%,rgba(255,255,255,0)_70%)] rounded-full pointer-events-none"></div>
                <div className="text-center lg:text-left z-10 animate-[fadeInUp_0.8s_ease-out] mx-auto lg:mx-0 max-w-[900px]">
                    <span className="inline-block px-4 py-2 bg-indigo-500/10 text-indigo-600 rounded-full font-semibold text-sm mb-6">#1 Job Board</span>
                    <h1 className="text-[3rem] sm:text-[4.5rem] font-extrabold leading-[1.1] mb-6 text-slate-900 tracking-tight">
                        Find Your <span className="bg-gradient-to-br from-indigo-600 to-emerald-500 bg-clip-text text-transparent inline-block">Dream Job</span><br />
                        Build Your Future
                    </h1>
                    <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-[700px] mx-auto lg:mx-0">
                        Connecting talent with opportunity. Discover thousands of job openings
                        from top companies and startups. Your next big career move starts here.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white p-2 rounded-full shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] flex items-center max-w-[650px] mx-auto lg:mx-0 mb-12 border border-black/5 transition-all duration-300 focus-within:-translate-y-1 focus-within:shadow-[0_25px_50px_-10px_rgba(79,70,229,0.15)] focus-within:border-indigo-500/30">
                        <div className="flex-1 flex items-center pl-6">
                            <FaSearch className="text-slate-400 mr-4 text-[1.4rem]" />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company..."
                                className="w-full border-none text-[1.15rem] text-slate-900 outline-none bg-transparent font-medium placeholder:text-slate-400"
                            />
                        </div>
                        <Link to="/user/find-jobs" className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-4 px-10 rounded-full font-bold text-[1.05rem] no-underline transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-5px_rgba(79,70,229,0.5)] hover:bg-gradient-to-br hover:from-indigo-700 hover:to-indigo-800">
                            Search
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[800px] mx-auto lg:mx-0">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white p-5 rounded-[20px] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] flex items-center gap-4 border border-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.08)]">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] relative overflow-hidden" style={{ background: `${stat.color}15`, color: stat.color }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
                                    <stat.icon />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image Collage */}
                <div className="relative w-full h-[600px] hidden lg:flex items-center justify-center perspective-[1000px]">
                    <div className="relative w-full max-w-[600px] h-full">
                        {/* Connecting Arrows */}
                        <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none drop-shadow-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                            <path d="M200 120 C 250 120, 350 120, 400 120" fill="none" stroke="#4f46e5" strokeWidth="3" strokeDasharray="8 6" className="animate-[dash_30s_linear_infinite]" />
                            <circle cx="200" cy="120" r="4" fill="#4f46e5" />
                            <circle cx="400" cy="120" r="4" fill="#4f46e5" />

                            <path d="M480 220 C 480 280, 160 250, 160 300" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="8 6" className="animate-[dash_30s_linear_infinite]" />
                            <circle cx="480" cy="220" r="4" fill="#10b981" />
                            <circle cx="160" cy="300" r="4" fill="#10b981" />

                            <path d="M240 400 C 300 400, 320 450, 380 480" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 6" className="animate-[dash_30s_linear_infinite]" />
                            <circle cx="240" cy="400" r="4" fill="#f59e0b" />
                            <circle cx="380" cy="480" r="4" fill="#f59e0b" />
                        </svg>

                        <div className="absolute w-[160px]! h-[200px]! rounded-[20px] bg-white p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2.5 hover:scale-110 hover:rotate-2 hover:z-50 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] top-5 left-10 z-10 animate-[float_6s_ease-in-out_infinite]">
                            <img src="/assets/hero/hero-searching.png" alt="Searching" className="w-full h-full object-cover rounded-[14px] block scale-115 transition-transform duration-500 hover:scale-125 clip-image" />
                            <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 bg-white py-1.5 px-4 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap z-20 border-2 border-indigo-600 text-indigo-600 flex items-center gap-1.5">Searching</div>
                            <div className="absolute w-3 h-3 bg-white border-[3px] border-indigo-600 rounded-full z-30 shadow-sm -right-1.5 top-1/2 -translate-y-1/2"></div>
                        </div>

                        <div className="absolute w-[160px]! h-[200px]! rounded-[20px] bg-white p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2.5 hover:scale-110 hover:rotate-2 hover:z-50 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] top-5 right-10 z-[9] animate-[float_7s_ease-in-out_infinite_1s]">
                            <div className="absolute w-3 h-3 bg-white border-[3px] border-indigo-600 rounded-full z-30 shadow-sm -left-1.5 top-1/2 -translate-y-1/2"></div>
                            <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 bg-white py-1.5 px-4 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap z-20 border-2 border-emerald-500 text-emerald-500 flex items-center gap-1.5">Got Offer!</div>
                            <img src="/assets/hero/hero-offer.png" alt="Offer" className="w-full h-full object-cover rounded-[14px] block scale-115 transition-transform duration-500 hover:scale-125 clip-image" />
                            <div className="absolute w-3 h-3 bg-white border-[3px] border-emerald-500 rounded-full z-30 shadow-sm -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                        </div>

                        <div className="absolute w-[160px]! h-[200px]! rounded-[20px] bg-white p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2.5 hover:scale-110 hover:rotate-2 hover:z-50 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] top-[300px] left-20 z-[8] animate-[float_8s_ease-in-out_infinite_0.5s]">
                            <div className="absolute w-3 h-3 bg-white border-[3px] border-emerald-500 rounded-full z-30 shadow-sm -top-1.5 left-1/2 -translate-x-1/2"></div>
                            <img src="/assets/hero/hero-commute.png" alt="Commute" className="w-full h-full object-cover rounded-[14px] block scale-115 transition-transform duration-500 hover:scale-125 clip-image" />
                            <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 bg-white py-1.5 px-4 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap z-20 border-2 border-amber-500 text-amber-500 flex items-center gap-1.5">Commuting</div>
                            <div className="absolute w-3 h-3 bg-white border-[3px] border-amber-500 rounded-full z-30 shadow-sm -right-1.5 top-1/2 -translate-y-1/2"></div>
                        </div>

                        <div className="absolute w-[160px]! h-[200px]! rounded-[20px] bg-white p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2.5 hover:scale-110 hover:rotate-2 hover:z-50 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] bottom-5 right-[60px] z-[11] animate-[float_9s_ease-in-out_infinite_1.5s]">
                            <div className="absolute w-3 h-3 bg-white border-[3px] border-amber-500 rounded-full z-30 shadow-sm -left-1.5 top-1/2 -translate-y-1/2"></div>
                            <img src="/assets/hero/hero-working.png" alt="Working" className="w-full h-full object-cover rounded-[14px] block scale-115 transition-transform duration-500 hover:scale-125 clip-image" />
                            <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 bg-white py-1.5 px-4 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap z-20 border-2 border-pink-600 text-pink-600 flex items-center gap-1.5">Working</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 px-5 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364748b' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-[3rem] font-extrabold text-slate-900 mb-5 relative inline-block tracking-tight">
                            Explore by Category
                            <span className="block w-20 h-1 bg-gradient-to-r from-indigo-600 to-emerald-500 mx-auto mt-2.5 rounded-full"></span>
                        </h2>
                        <p className="text-xl text-slate-500 max-w-[600px] mx-auto">
                            Deep dive into the industry of your choice. We have jobs for every skill set.
                        </p>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-w-[1200px] mx-auto">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/user/find-jobs?category=${encodeURIComponent(category.name)}`}
                                className="group relative flex flex-col p-6 rounded-[20px] bg-white transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] border border-black/[0.04] overflow-hidden min-h-[220px] hover:scale-105 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] hover:z-10 no-underline"
                                style={{ boxShadow: `0 20px 40px -5px rgba(0,0,0,0.0)`, '--theme-color': category.color }}
                            >
                                <div className="absolute -top-[50px] -right-[50px] w-[150px] h-[150px] rounded-full blur-3xl opacity-5 bg-[var(--theme-color)] transition-all duration-500 group-hover:-top-[20px] group-hover:-right-[20px] group-hover:w-[200px] group-hover:h-[200px] group-hover:opacity-10 z-[0]"></div>
                                <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-[1.8rem] mb-4 transition-all duration-300 bg-white/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(0,0,0,0.05)] text-[var(--theme-color)] overflow-hidden group-hover:scale-110 group-hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
                                    <div className="absolute inset-0 bg-[var(--theme-color)] opacity-10 transition-all duration-300 group-hover:opacity-20"></div>
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug relative z-10">{category.name}</h3>
                                <div className="mt-auto pt-4 border-t border-dashed border-black/5 flex items-center justify-between text-slate-500 text-sm font-medium relative z-10">
                                    <span>{category.count} jobs open</span>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-transparent group-hover:bg-[var(--theme-color)]">
                                        <FaArrowRight className="text-[var(--theme-color)] text-sm opacity-0 -translate-x-2.5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-5 bg-slate-50">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-[2.5rem] font-bold text-center mb-4 text-slate-900">How It Works</h2>
                    <p className="text-center text-slate-500 mb-10 text-[1.1rem] max-w-[600px] mx-auto">
                        We make it easy to find and apply for jobs. Follow these simple steps.
                    </p>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 max-w-[1200px] mx-auto">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center p-10 bg-white rounded-[12px] shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)] relative">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-[1.2rem] shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1)]">
                                    {index + 1}
                                </div>
                                <step.icon className="text-[3rem] text-indigo-600 mb-6 mx-auto" />
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-5 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-center bg-cover bg-fixed relative">
                <div className="absolute inset-0 bg-slate-900/90"></div>
                <div className="relative z-10 text-center max-w-[800px] mx-auto text-white">
                    <h2 className="text-[3rem] font-extrabold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-[1.25rem] text-white/80 mb-10">
                        Join thousands of job seekers who have successfully found their
                        dream jobs through our platform.
                    </p>
                    <Link to="/user/find-jobs" className="bg-emerald-500 text-white py-4 px-12 rounded-full text-[1.1rem] font-bold no-underline transition-all duration-300 inline-block hover:-translate-y-0.5 hover:shadow-lg">
                        Explore All Jobs
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
