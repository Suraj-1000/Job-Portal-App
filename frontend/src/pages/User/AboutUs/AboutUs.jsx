import { FaBullseye, FaHandshake, FaLightbulb, FaUsers } from 'react-icons/fa';


const AboutUs = () => {

    return (
        <div className="font-sans">
            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-24 px-5 text-center rounded-b-[40px] mb-16">
                <div className="max-w-[800px] mx-auto">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">Connecting Talent with <span className="text-emerald-500">Greatness</span></h1>
                    <p className="text-xl text-slate-400">We are on a mission to revolutionize the way people find jobs and companies build teams.</p>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-[1200px] mx-auto mb-20 px-5">
                <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
                    <div className="bg-white p-10 rounded-2xl shadow-sm text-center transition-transform duration-300 hover:-translate-y-2.5 hover:shadow-xl">
                        <div className="w-[70px] h-[70px] bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"><FaBullseye /></div>
                        <h3 className="text-2xl mb-4 text-slate-900 font-bold">Our Mission</h3>
                        <p className="text-slate-500 leading-relaxed">To empower every professional to achieve more and help organizations find the best talent.</p>
                    </div>
                    <div className="bg-white p-10 rounded-2xl shadow-sm text-center transition-transform duration-300 hover:-translate-y-2.5 hover:shadow-xl">
                        <div className="w-[70px] h-[70px] bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"><FaLightbulb /></div>
                        <h3 className="text-2xl mb-4 text-slate-900 font-bold">Innovation</h3>
                        <p className="text-slate-500 leading-relaxed">We constantly push boundaries to create smart, intuitive, and efficient recruitment solutions.</p>
                    </div>
                    <div className="bg-white p-10 rounded-2xl shadow-sm text-center transition-transform duration-300 hover:-translate-y-2.5 hover:shadow-xl">
                        <div className="w-[70px] h-[70px] bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"><FaHandshake /></div>
                        <h3 className="text-2xl mb-4 text-slate-900 font-bold">Trust</h3>
                        <p className="text-slate-500 leading-relaxed">Building a platform based on transparency, reliability, and mutual respect.</p>
                    </div>
                </div>
            </section>

            {/* Stats/Team */}
            <section className="max-w-[1200px] mx-auto mb-20 px-5 grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-center md:text-left">
                <div>
                    <h2 className="text-4xl mb-6 text-slate-900 font-bold">Built by Passionate People</h2>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        Founded in 2024, JobPortal has grown from a small startup to a leading job board.
                        Our diverse team of experts is dedicated to making the hiring process smooth and enjoyable.
                    </p>

                    <div className="flex gap-10 justify-center md:justify-start">
                        <div>
                            <strong className="block text-3xl text-indigo-600">10k+</strong>
                            <span className="text-slate-500">Success Stories</span>
                        </div>
                        <div>
                            <strong className="block text-3xl text-indigo-600">500+</strong>
                            <span className="text-slate-500">Partner Companies</span>
                        </div>
                    </div>
                </div>
                <div className="h-[400px] bg-slate-100 rounded-2xl flex items-center justify-center">
                    <FaUsers className="text-[8rem] text-slate-200" />
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
