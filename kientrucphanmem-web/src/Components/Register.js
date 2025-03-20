import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Register.css'; // Import file CSS
import Login from './Login';

function Register() {
    const [showLogin, setShowLogin] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fullnameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const handleBackClick = () => {
        setShowLogin(true);
    };

    useEffect(() => {
        const handleFocus = (inputRef) => {
            inputRef.current.previousElementSibling.classList.add('focused');
        };

        const handleBlur = (inputRef) => {
            if (!inputRef.current.value) {
                inputRef.current.previousElementSibling.classList.remove('focused');
            }
        };

        if (fullnameInputRef.current) {
            fullnameInputRef.current.addEventListener('focus', () => handleFocus(fullnameInputRef));
            fullnameInputRef.current.addEventListener('blur', () => handleBlur(fullnameInputRef));
        }

        if (phoneInputRef.current) {
            phoneInputRef.current.addEventListener('focus', () => handleFocus(phoneInputRef));
            phoneInputRef.current.addEventListener('blur', () => handleBlur(phoneInputRef));
        }

        if (passwordInputRef.current) {
            passwordInputRef.current.addEventListener('focus', () => handleFocus(passwordInputRef));
            passwordInputRef.current.addEventListener('blur', () => handleBlur(passwordInputRef));
        }

        if (confirmPasswordInputRef.current) {
            confirmPasswordInputRef.current.addEventListener('focus', () => handleFocus(confirmPasswordInputRef));
            confirmPasswordInputRef.current.addEventListener('blur', () => handleBlur(confirmPasswordInputRef));
        }

        return () => {
            if (fullnameInputRef.current) {
                fullnameInputRef.current.removeEventListener('focus', () => handleFocus(fullnameInputRef));
                fullnameInputRef.current.removeEventListener('blur', () => handleBlur(fullnameInputRef));
            }
            if (phoneInputRef.current) {
                phoneInputRef.current.removeEventListener('focus', () => handleFocus(phoneInputRef));
                phoneInputRef.current.removeEventListener('blur', () => handleBlur(phoneInputRef));
            }
            if (passwordInputRef.current) {
                passwordInputRef.current.removeEventListener('focus', () => handleFocus(passwordInputRef));
                passwordInputRef.current.removeEventListener('blur', () => handleBlur(passwordInputRef));
            }
            if (confirmPasswordInputRef.current) {
                confirmPasswordInputRef.current.removeEventListener('focus', () => handleFocus(confirmPasswordInputRef));
                confirmPasswordInputRef.current.removeEventListener('blur', () => handleBlur(confirmPasswordInputRef));
            }
        };
    }, []); // Close useEffect hook

    if (showLogin) {
        return <Login />;
    }

    const handleRegister = async () => {
        // Get values from refs
        const fullname = fullnameInputRef.current.value;
        const phone = phoneInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current.value;

        // Validate inputs
        const errors = {};
        if (!fullname) errors.fullname = 'Vui lòng nhập họ và tên';
        if (!phone) errors.phone = 'Vui lòng nhập số điện thoại';
        if (!password) errors.password = 'Vui lòng nhập mật khẩu';
        if (!confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
        if (password !== confirmPassword) errors.confirmPassword = 'Mật khẩu không khớp';

        // Check length
        if (fullname.length > 20) errors.fullname = 'Họ và tên không được quá 20 ký tự';
        if (phone.length > 20) errors.phone = 'Số điện thoại không được quá 20 ký tự';
        if (password.length > 20) errors.password = 'Mật khẩu không được quá 20 ký tự';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    phone,
                    password
                })
            });

            if (response.ok) {
                alert('Đăng ký thành công!');
                setShowLogin(true);
            } else {
                alert('Đăng ký thất bại. Vui lòng thử lại!');
            }
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
                    {isLoading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
                </button>
                <button className="back-button" onClick={handleBackClick}>Quay lại</button>
            </div>
        </div>
    );
}

export default Register;