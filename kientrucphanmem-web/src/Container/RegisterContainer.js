import React, { useState, useRef, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import '../Styles/Register.css'; // Import file CSS

function RegisterContainer() {
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const nicknameInputRef = useRef(null); // Add nickname ref
    const fullnameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const handleBackClick = () => {
        // make browser back
        window.history.back();
    };

    const handleFocus = (inputRef) => {
        if (inputRef.current && inputRef.current.previousElementSibling) {
            inputRef.current.previousElementSibling.classList.add('focused');
        }
    };

    const handleBlur = (inputRef) => {
        if (inputRef.current && inputRef.current.previousElementSibling && !inputRef.current.value) {
            inputRef.current.previousElementSibling.classList.remove('focused');
        }
    };

    useEffect(() => {
        const refs = [nicknameInputRef, fullnameInputRef, phoneInputRef, passwordInputRef, confirmPasswordInputRef];
        
        refs.forEach(ref => {
            if (ref.current) {
                ref.current.addEventListener('focus', () => handleFocus(ref));
                ref.current.addEventListener('blur', () => handleBlur(ref));
            }
        });

        return () => {
            refs.forEach(ref => {
                if (ref.current) {
                    ref.current.removeEventListener('focus', () => handleFocus(ref));
                    ref.current.removeEventListener('blur', () => handleBlur(ref));
                }
            });
        };
    }, []);

    const handleRegister = async () => {
        // Get values from refs
        const nickname = nicknameInputRef.current.value;
        const fullname = fullnameInputRef.current.value;
        const phone = phoneInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current.value;

        // Validate inputs
        const errors = {};
        if (!nickname) errors.nickname = 'Vui lòng nhập biệt danh';
        if (!fullname) errors.fullname = 'Vui lòng nhập họ và tên';
        if (!phone) errors.phone = 'Vui lòng nhập số điện thoại';
        if (!password) errors.password = 'Vui lòng nhập mật khẩu';
        if (!confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
        if (password !== confirmPassword) errors.confirmPassword = 'Mật khẩu không khớp';

        // Check length
        if (nickname.length > 20) errors.nickname = 'Biệt danh không được quá 20 ký tự';
        if (fullname.length > 20) errors.fullname = 'Họ và tên không được quá 20 ký tự';
        if (phone.length > 20) errors.phone = 'Số điện thoại không được quá 20 ký tự';
        if (password.length > 20) errors.password = 'Mật khẩu không được quá 20 ký tự';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            await apiRequest('api/users/register', 'POST', {
                nickname,
                fullname,
                phone,
                password,
            });

            alert('Đăng ký thành công!');
            window.location.href = '/'; // Redirect to home page with reload

        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-icon">
                    <i className="fas fa-user-plus"></i>
                </div>
                <h2>Tạo tài khoản</h2>
                <div className="input-group">
                    <label htmlFor="nickname">Biệt danh *</label>
                    <input type="text" id="nickname" ref={nicknameInputRef} maxLength={20} />
                    {formErrors.nickname && <span className="error">{formErrors.nickname}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="fullname">Họ và tên *</label>
                    <input type="text" id="fullname" ref={fullnameInputRef} maxLength={20} />
                    {formErrors.fullname && <span className="error">{formErrors.fullname}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input type="tel" id="phone" ref={phoneInputRef} maxLength={20} />
                    {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Mật khẩu *</label>
                    <input type="password" id="password" ref={passwordInputRef} maxLength={20} />
                    {formErrors.password && <span className="error">{formErrors.password}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu *</label>
                    <input type="password" id="confirmPassword" ref={confirmPasswordInputRef} maxLength={20} />
                    {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                </div>
                <button 
                    className="register-button" 
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                     {isLoading ? (
                        <div className="loading-dots">
                            ĐANG XỬ LÝ
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    ) : (
                        'ĐĂNG KÝ'
                    )}
                </button>
                <button className="back-button" onClick={handleBackClick}>Quay lại</button>
            </div>
        </div>
    );
}

export default RegisterContainer;
