import React, { useState } from 'react';
import '../Styles/Login.css';
import Register from './Register'; // Import Register component
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component
import logoImage from '../images/Icon_of_Zalo.png'; // Thêm dòng này ở đầu file
import QRImage from '../images/qr-code.png'; // Thêm dòng này ở đầu file
function Login() {
    const [activeTab, setActiveTab] = useState('phone');
    const [passwordVisible, setPasswordVisible] = useState(false);
	
	const [showRegister, setShowRegister] = useState(false); // Thêm state register
    const [showForgotPW, setShowForgotPW] = useState(false); // Thêm state forgot PW
    
	const handleTabClick = (tabId) => {
        setActiveTab(tabId);
	}
	const handleRegisterClick = () => {
        setShowRegister(true);
	}	

    const handleForgotPWClick = () => {
        setShowForgotPW(true);
	}

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('your-api-endpoint/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    password: password
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

    const [loginError, setLoginError] = useState(false);
	
	if (showRegister) {
        return <Register />;
    }

    if (showForgotPW) {
        return <ForgotPassword />;
    }
	
    return (
        <div className="container">
            <div className="login-box">
                <div className="logo">
                    <img src={logoImage} alt="ZaLoLo" />
                </div>
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'phone' ? 'active' : ''}`}
                        onClick={() => handleTabClick('phone')}
                    >
                        SỐ ĐIỆN THOẠI
                    </button>
                    <button
                        className={`tab ${activeTab === 'qr' ? 'active' : ''}`}
                        onClick={() => handleTabClick('qr')}
                    >
                        QUÉT MÃ QR
                    </button>
                </div>
                {activeTab === 'phone' && (
                    <div className="tab-content">
                        <div className="input-group">
                            <select className="country-code">
                                <option value="+84">+84</option>
                                <option value="+1">+1</option>
                                <option value="+2">+2</option>
                                <option value="+3">+3</option>
                                <option value="+4">+4</option>
                                <option value="+5">+5</option>
                                <option value="+6">+6</option>
                            </select>
                            <input 
                                type="tel" 
                                placeholder="Số điện thoại"
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
                            <div className="input-group">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="show-password" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? 'Ẩn' : 'Hiện'}
                                </button>
                            </div>
                            {loginError && <div className="error-message">Sai mật khẩu hoặc số điện thoại</div>}
                            <button className="login-button" onClick={async () => {
                                if (!phoneNumber || !password) {
                                    setLoginError(true);
                                    return;
                                }
                                if (phoneNumber.length !== 10) {
                                    setLoginError(true);
                                    return;
                                }
                            const success = await handleLogin();
                            if (success) {
                                window.location.href = '/home'; // Chuyển đến trang chủ khi đăng nhập thành công
                            } else {
                                setLoginError(true);
                            }
                        }}>ĐĂNG NHẬP VỚI MẬT KHẨU</button>

                        <button className="forgot-button" onClick={handleForgotPWClick}>QUÊN MẬT KHẨU</button>
                        <div className="register">
                            Chưa có tài khoản? <button onClick={handleRegisterClick}>Đăng ký</button>
                        </div>
        
                    </div>
                )}
                {activeTab === 'qr' && (
                    <div className="tab-content">
                        <p>Quét mã QR để đăng nhập</p>
                        <div className="qr-code">
                            <img src={QRImage} alt="QR Code" style={{ width: '200px', height: '200px' }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;