import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onLogout) onLogout();
  };

  // Check if this is an auth page (no user prop or explicitly null/undefined)
  const isAuthPage = !user || user === null || user === undefined;

  return (
    <header className={`py-4 fixed top-0 left-0 w-full z-[1000] text-white shadow-[0_4px_20px_rgba(102,126,234,0.3)] bg-gradient-to-br from-[#667eea] to-[#764ba2] ${isAuthPage ? 'relative shadow-none' : ''}`}>
      <div className={`max-w-[1400px] mx-auto px-8 flex items-center md:px-4 ${isAuthPage ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold m-0 md:text-xl">Job Test System</h1>
        </div>
        {!isAuthPage && user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 md:hidden">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold text-lg overflow-hidden shrink-0">
                {user?.image ? (
                  <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white">{user?.firstName?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[0.95rem]">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs opacity-90">{user?.role?.toUpperCase()}</span>
              </div>
            </div>
            <button
              className="py-2 px-5 bg-white/20 border border-white/30 text-white rounded-md cursor-pointer font-medium transition-all duration-300 hover:bg-white/30 hover:-translate-y-px"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

