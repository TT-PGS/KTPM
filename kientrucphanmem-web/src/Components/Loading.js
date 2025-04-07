import React from 'react';
import '../Styles/Loading.css'; // Optional: Add styles for the loading spinner

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
