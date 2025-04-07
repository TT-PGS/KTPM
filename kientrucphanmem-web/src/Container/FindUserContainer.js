import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { apiRequest } from '../utils/api';
import '../Styles/FindUser.css';

const DEFAULT_FRIEND_STATUS = 'Chưa kết bạn';

const FindUserContainer = () => {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [friendStatus, setFriendStatus] = useState(''); // Add friend status state
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError('');
    setSuccessMessage('');
    try {
      const response = await apiRequest (`api/users/find?phone=${phone}`, 'GET');

      if (!response) {
        throw new Error('User not found');
      }
      setUser(response.user);
      let status = DEFAULT_FRIEND_STATUS;
      if (response.friends){
        switch (response.friends.status) {
          case 'accepted':
            status = 'Bạn bè';
            break;
          case 'pending':
            status = 'Đang chờ xác nhận';
            break;
          case 'rejected':
            status = 'Đã từ chối';
            break;
          default:
            status = DEFAULT_FRIEND_STATUS;
            break;
        }
      }
      setFriendStatus(status); // Set friend status from the response
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      const response = await apiRequest('api/friends/request', 'POST', { recipientId: user._id });

      if (!response) {
        throw new Error('Failed to send friend request');
      }

      setSuccessMessage('Friend request sent successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="find-user-container">
        <h2>Tìm người dùng qua số điện thoại</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {user && (
          <div className="user-info">
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Fullname:</strong> {user.fullname}</p>
            <p><strong>Friend Status:</strong> {friendStatus}</p> {/* Display friend status */}
            {friendStatus === DEFAULT_FRIEND_STATUS && (
              <button onClick={handleSendFriendRequest}>Send Friend Request</button>
            )}
          </div>
        )}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </Layout>
  );
};

export default FindUserContainer;
