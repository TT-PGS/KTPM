import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { apiRequest } from '../utils/api';
import '../Styles/Friends.css';

const RequestFriendsContainer = () => {
  const [listFriends, setListFriends] = useState({friends: [], requestFromOthers: [], requestToOthers: []});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await apiRequest('api/friends/requests', 'GET');
        setListFriends(response); // Set the list of friends from the API response
      } catch (err) {
        setError('Failed to fetch friends list');
      }
    };

    fetchFriends();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      await apiRequest('api/friends/accept', 'POST', { requestId });
      window.location.reload(); // Reload the page to update the list of friends
    } catch (err) {
      setError('Failed to accept friend request');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await apiRequest('api/friends/reject', 'POST', { requestId });
      window.location.reload(); // Reload the page to update the list of friends
    } catch (err) {
      setError('Failed to reject friend request');
    }
  };

  return (
<Layout>
      <div className="friends-container">
        <h2>Danh sách bạn bè đang chờ xử lý</h2>
        {error && <div className="error-message">{error}</div>}

        {/* List requests from others */}
        {listFriends.requestFromOthers.length > 0 && (
          <div className="request-from-others">
            <h3>Yêu cầu kết bạn từ người khác</h3>
            <ul className="friends-row">
              <li className="friend-row">
                <span><strong>Nickname:</strong></span>
                <span><strong>Fullname:</strong></span>
                <span><strong>Phone:</strong></span>
                <span><strong>Status:</strong></span>
                <span><strong>Actions:</strong></span>
              </li>
              {listFriends.requestFromOthers.map((request) => (
                <li key={request._id} className="friend-row">
                  <span>{request.requester.nickname}</span>
                  <span>{request.requester.fullname}</span>
                  <span>{request.requester.phone}</span>
                  <span>{request.status}</span>
                  <span>
                    <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                    <button onClick={() => handleRejectRequest(request._id)}>Reject</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* List requests to others */}
        {listFriends.requestToOthers.length > 0 && (
          <div className="request-to-others">
            <h3>Yêu cầu kết bạn đã gửi</h3>
            <ul className="friends-row">
              <li className="friend-row">
                <span><strong>Nickname:</strong></span>
                <span><strong>Fullname:</strong></span>
                <span><strong>Phone:</strong></span>
                <span><strong>Status:</strong></span>
              </li>
              {listFriends.requestToOthers.map((request) => (
                <li key={request._id} className="friend-row">
                  <span>{request.recipient.nickname}</span>
                  <span>{request.recipient.fullname}</span>
                  <span>{request.recipient.phone}</span>
                  <span>{request.status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RequestFriendsContainer;
