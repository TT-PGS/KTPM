import React, { useState } from 'react';
import '../Styles/Profile.css';
import profileImage from '../images/profile-image.jpg'; // Ảnh mặc định

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        bio: 'xách gối lên và đi ... ngủ',
        gender: 'Nam',
        birthday: '01 tháng 01, 1993',
        phone: '+84 836 444 777',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Gửi dữ liệu profileData lên server (nếu cần)
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    return (
        <div className="profile-container">
            {/* ... (phần header và ảnh đại diện) ... */}
            <div className="personal-info">
                <div className="info-title">Thông tin cá nhân</div>
                <div className="info-item">
                    <div className="info-label">Bio</div>
                    {isEditing ? (
                        <input type="text" name="bio" value={profileData.bio} onChange={handleChange} />
                    ) : (
                        <div className="info-value">{profileData.bio}</div>
                    )}
                </div>
                <div className="info-item">
                    <div className="info-label">Giới tính</div>
                    {isEditing ? (
                        <input type="text" name="gender" value={profileData.gender} onChange={handleChange} />
                    ) : (
                        <div className="info-value">{profileData.gender}</div>
                    )}
                </div>
                <div className="info-item">
                    <div className="info-label">Ngày sinh</div>
                    {isEditing ? (
                        <input type="text" name="birthday" value={profileData.birthday} onChange={handleChange} />
                    ) : (
                        <div className="info-value">{profileData.birthday}</div>
                    )}
                </div>
                <div className="info-item">
                    <div className="info-label">Điện thoại</div>
                    {isEditing ? (
                        <input type="text" name="phone" value={profileData.phone} onChange={handleChange} />
                    ) : (
                        <div className="info-value">{profileData.phone}</div>
                    )}
                </div>
                <div className="info-note">
                    Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này
                </div>
            </div>
            {isEditing ? (
                <button className="update-button" onClick={handleSaveClick}>Lưu</button>
            ) : (
                <button className="update-button" onClick={handleEditClick}>Cập nhật <i className="fas fa-pencil-alt"></i></button>
            )}
        </div>
    );
}

export default Profile;
