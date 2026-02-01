import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';


const UserLayout = () => {
    return (
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <UserNavbar />
            <main className="flex-1 w-full pt-5">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
    );
};

export default UserLayout;
