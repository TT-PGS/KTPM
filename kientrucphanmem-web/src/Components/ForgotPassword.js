import React, { useState, useRef, useEffect } from 'react';
import '../Styles/ForgotPassword.css'; // Import file CSS
import Login from './Login';
import logoImage from '../images/Icon_of_Zalo.png'; // Thêm dòng này ở đầu file

function ForgotPassword() {
    const [showLogin, setShowLogin] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleBackClick = () => {
        setShowLogin(true);
    };

    const [loginError, setLoginError] = useState(false);

    const handleContinueClick = async () => {
        // Thêm logic xử lý khi nhấn nút "Tiếp tục"
        try {
            const response = await fetch('your-api-endpoint/forgotPW', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                })
            });

            const data = await response.json();
            if (response.ok) {
                // Handle successful login
                console.log('Login successful', data);
            } else {
                // Handle login error
                console.error('Login failed', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        
    };

    if (showLogin) {
        return <Login />;
    }
    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <div className="zalo-logo">
                    <img src={logoImage} alt="Zalo Logo" />
                </div>
                <h2>Khôi phục mật khẩu</h2>
                <p>Để khôi phục mật khẩu, vui lòng nhập số điện thoại đã đăng ký tài khoản Zolo</p>
                <div className="phone-input">
                    <select className="country-code">
                        <option value="+84">+84</option>
						<option value="+1">+1</option>
						<option value="+2">+2</option>
						<option value="+3">+3</option>
						<option value="+4">+4</option>
						<option value="+5">+5</option>
                        {/* Thêm các mã quốc gia khác nếu cần */}
                    </select>
                    <input
                        type="tel"
                        placeholder="Số điện thoại"
                        //onChange={handlePhoneNumberChange}
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setPhoneNumber(value.slice(0, 10));
                        }}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
                {loginError && <div className="error-message">SĐT quá ngắn hoặc tài khoản không tồn tại</div>}
                            <button className="continue-button" onClick={async () => {
                                if (phoneNumber.length < 10) {
                                    setLoginError(true);
                                    return;
                                }
                            const success = await handleContinueClick();
                            if (success) {
                                window.location.href = '/home'; // Chuyển đến trang chủ khi đăng nhập thành công
                            } else {
                                setLoginError(true);
                            }
                        }}>Tiếp tục</button>
                {/* <button className="continue-button" onClick={handleContinueClick}>Tiếp tục</button> */}
                <button className="cancel-button" onClick={handleBackClick}>Hủy</button>
            </div>
        </div>
    );
}

export default ForgotPassword;