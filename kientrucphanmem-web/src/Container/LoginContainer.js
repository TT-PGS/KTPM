import React, { useState } from 'react';
import '../Styles/Login.css';
import { apiRequest } from '../utils/api'; // Import the apiRequest utility
// import Home from './Home'; // Import Home component
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component
import logoImage from '../images/Icon_of_Zalo.png'; // Thêm dòng này ở đầu file
import QRImage from '../images/qr-code.png'; // Thêm dòng này ở đầu file
function LoginContainer() {
    console.log('LoginContainer=====================================');
    const [activeTab, setActiveTab] = useState('phone');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState(''); // Updated to store error message
	
	// const [showRegister, setShowRegister] = useState(false); // Thêm state register
    const [showForgotPW, setShowForgotPW] = useState(false); // Thêm state forgot PW
    // const [showHome, setShowHome] = useState(false); // Thêm state forgot PW
    
	const handleTabClick = (tabId) => {
        setActiveTab(tabId);
	}
	const handleRegisterClick = () => {
        // setShowRegister(true);
        window.location.href = '/register'; // Redirect to Register with reload
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
            const data = await apiRequest('api/users/login', 'POST', {
                phoneNumber: phoneNumber,
                password: password,
            });

            // Save the token to localStorage
            if (data && data.token) {
                // localStorage.setItem(AUTH_TOKEN_KEY, data.token);
                // console.log('Login successful', data);
                // setShowHome(true); // Redirect to Home
                // return true;
                window.location.href = '/'; // Redirect to Home with reload
            } else {
                setLoginError('Sai mật khẩu hoặc số điện thoại không đúng'); // Set error message
                console.error('Login failed', data);
                return false;
            }
        } catch (error) {
            setLoginError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.'); // Set error message for server issues
            console.error('Error:', error);
            return false;
        }
    };

    // const [loginError, setLoginError] = useState(false);
	
	//  if (showRegister) {
    //      return <RegisterContainer />;
    //  }

    if (showForgotPW) {
        return <ForgotPassword />;
    }

    // if (showHome) {
    //     return <Home />;
    // }
	
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
                                <option value="+1">+12</option>
                                <option value="+2">+23</option>
                                <option value="+3">+34</option>
                                <option value="+4">+45</option>
                                <option value="+5">+56</option>
                                <option value="+6">+67</option>
                            </select>
                            <input 
                                type="tel" 
                                placeholder="Số điện thoại"
                                maxLength={20}
                                value={phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setPhoneNumber(value.slice(0, 20));
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
                            {loginError && <div className="error-message">{loginError}</div>}
                            <button className="login-button" onClick={async () => {
                                if (!phoneNumber || !password) {
                                    setLoginError('Vui lòng nhập đầy đủ số điện thoại và mật khẩu.');
                                    return;
                                }
                                if (phoneNumber.length < 10) {
                                    setLoginError('Số điện thoại ít nhất 10 chữ số.');
                                    return;
                                }
                                handleLogin();
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

export default LoginContainer;
