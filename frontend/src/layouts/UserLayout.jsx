import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import Footer from '../components/Footer/Footer';
import './UserLayout.css';

const UserLayout = () => {
    return (
        <div className="user-layout">
            <UserNavbar />
            <main className="user-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
