import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsList } from '../redux/actions/friendActions';
import { createGroup } from '../redux/actions/groupActions';
import Layout from './Layout';
import '../Styles/CreateGroup.css';

const CreateGroupContainer = () => {
  const dispatch = useDispatch();
  const { friendsList } = useSelector((state) => state.friend);
  const [groupName, setGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch friends list on component mount
  useEffect(() => {
    dispatch(fetchFriendsList());
  }, [dispatch]);

  const handleFriendSelection = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setError('Tên nhóm không được để trống.');
      return;
    }
    if (selectedFriends.length < 2) {
      setError('Vui lòng chọn ít nhất 2 thành viên để tạo nhóm.');
      return;
    }

    try {
      await dispatch(createGroup({ groupName, participants: selectedFriends }));
      setSuccessMessage('Nhóm đã được tạo thành công!');
      setGroupName('');
      setSelectedFriends([]);
    } catch (err) {
      setError('Đã xảy ra lỗi khi tạo nhóm. Vui lòng thử lại.');
    }
  };

  return (
    <Layout>
      <div className="create-group-container">
        <h2>Tạo nhóm mới</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="input-group">
          <input
            type="text"
            placeholder="Nhập tên nhóm"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="friends-list">
          <h3>Chọn thành viên</h3>
          {friendsList.map((friend) => (
            <div
              key={friend._id}
              className={`friend-item ${selectedFriends.includes(friend._id) ? 'selected' : ''}`}
              onClick={() => handleFriendSelection(friend._id)}
            >
              {friend.nickname} ({friend.fullname})
            </div>
          ))}
        </div>
        <button className="create-group-button" onClick={handleCreateGroup}>
          Tạo nhóm
        </button>
      </div>
    </Layout>
  );
};

export default CreateGroupContainer;
