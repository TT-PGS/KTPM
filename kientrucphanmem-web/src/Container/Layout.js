import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../constants/user';
import '../Styles/Layout.css'; // Add styles for the layout

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false); // State to toggle submenu visibility

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY); // Clear the authentication token
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="layout-container">
      <div className="left-sidebar">
        <button className="sidebar-btn" onClick={() => window.location.href='/profile'}>👤</button>
        <button className="sidebar-btn" onClick={() => window.location.href='/groups' }>👨‍👩‍👦‍👦</button>
        <button className="sidebar-btn" onClick={() => window.location.href='/friends' }>💬</button>
        <div className="submenu-container">
          <button className="sidebar-btn" onClick={() => setShowSubMenu(!showSubMenu)}>⚙️</button>
          {showSubMenu && (
            <div className="submenu">
              {/* <button className="submenu-item" onClick={() => navigate('/settings')}>Settings</button> */}
              {/* make button find user by phone */}
              <button className="submenu-item" onClick={() => window.location.href='/find-user'}>Tìm người dùng theo số điện thoại</button>
              <button className="submenu-item" onClick={() => window.location.href='/request-friends'}>Danh sách bạn bè chờ xử lý</button>
              <button className="submenu-item" onClick={() => window.location.href='/create-group'}>Tạo nhóm mới</button>
              <button className="submenu-item logout-btn" onClick={handleLogout}>Đăng xuất khỏi trái đất</button>
            </div>
          )}
        </div>
      </div>
      <div className="content-container">
        {children} {/* Render the child components */}
      </div>
    </div>
  );
};

export default Layout;
