import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import '../Styles/Profile.css';
import { apiRequest } from '../utils/api';


function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Fetch profile data when component mounts
    const userData = useSelector((state) => state.user.user);
    const [profileData, setProfileData] = useState(userData);
    useEffect(() => {
        console.log('userData', userData);
    }, []);

    // const fetchProfileData = async () => {
    //     try {
    //         const response = await apiRequest('api/users/me', 'GET');
    //         console.log('API Response:', response); // Debug log
    //         if (response && response.data) {
    //             setProfileData(response.data);
    //         } else {
    //             console.error('Invalid response format:', response);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching profile:', error.response || error);
    //         alert('Không thể tải thông tin profile');
    //     }
    // };

    const handleUpdate = async () => {
        
        // Validate inputs
        const errors = {};
        if (!profileData.nickname) errors.nickname = 'Vui lòng nhập biệt danh';
        if (!profileData.fullname) errors.fullname = 'Vui lòng nhập họ tên';
        if (!profileData.gender) errors.gender = 'Vui lòng nhập giới tính';
        if (!profileData.birthday) errors.birthday = 'Vui lòng ngày tháng năm sinh';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            await apiRequest('api/users/', 'PUT', profileData);
            alert('Cập nhật thành công!');
            setIsEditing(false);
        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <div className="profile-container">
                <div className="personal-info">
                    <div className="info-title">Thông tin cá nhân</div>
                    <div className="info-item">
                        <div className="info-label">Nick name</div>
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="nickname" 
                                value={profileData.nickname} 
                                onChange={handleChange}
                                className={formErrors.nickname ? 'error' : ''} 
                            />
                        ) : (
                            <div className="info-value">{profileData.nickname}</div>
                        )}
                        {formErrors.nickname && <div className="error-message">{formErrors.nickname}</div>}
                    </div>
                    <div className="info-item">
                        <div className="info-label">Họ và tên</div>
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="fullname" 
                                value={profileData.fullname} 
                                onChange={handleChange}
                                className={formErrors.phone ? 'error' : ''} 
                            />
                        ) : (
                            <div className="info-value">{profileData.fullname}</div>
                        )}
                        {formErrors.fullname && <div className="error-message">{formErrors.fullname}</div>}
                    </div>
                    <div className="info-item">
                        <div className="info-label">Giới tính</div>
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="gender" 
                                value={profileData.gender} 
                                onChange={handleChange}
                                className={formErrors.gender ? 'error' : ''} 
                            />
                        ) : (
                            <div className="info-value">{profileData.gender}</div>
                        )}
                        {formErrors.gender && <div className="error-message">{formErrors.gender}</div>}
                    </div>

                    <div className="info-item">
                        <div className="info-label">Ngày sinh</div>
                        {isEditing ? (
                            <input 
                                type="date" 
                                name="birthday" 
                                value={profileData.birthday} 
                                onChange={handleChange}
                                className={formErrors.birthday ? 'error' : ''} 
                            />
                        ) : (
                            <div className="info-value">{profileData.birthday}</div>
                        )}
                        {formErrors.birthday && <div className="error-message">{formErrors.birthday}</div>}
                    </div>

                    
                    <div className="info-item">
                        <div className="info-label">Số điện thoại</div>
                        <div className="info-value">{profileData.phone}</div>
                    </div>
                  
                </div>
                {isEditing ? (
                    <button className="update-button" onClick={handleUpdate} disabled={isLoading}>
                        {isLoading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                ) : (
                    <button className="update-button" onClick={() => setIsEditing(true)}>
                        Cập nhật <i className="fas fa-pencil-alt"></i>
                    </button>
                )}
            </div>
        </Layout>
    );
}

export default Profile;
