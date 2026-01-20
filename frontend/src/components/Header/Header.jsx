import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

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
    <header className={`dashboard-header ${isAuthPage ? 'auth-header' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">Job Test System</h1>
        </div>
        {!isAuthPage && user && (
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                {user?.image ? (
                  <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="avatar-img" />
                ) : (
                  <span className="avatar-initial">{user?.firstName?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-role">{user?.role?.toUpperCase()}</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

