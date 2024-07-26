import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/dots.svg'; // Import the image
import intro from '../assets/images/slidetwo.svg'; // Import the image

const SlideTwo = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login'); // Redirect to Login page
    };

    const handleGetRegisterClick = () => {
        navigate('/register'); // Redirect to Register page
    };

    const slideOne = () => {
        navigate('/slideone'); // Redirect to SlideOne page
    };

    const slideTwo = () => {
        navigate('/slidetwo'); // Redirect to SlideTwo page
    };
    const Intro = () => {
        navigate('/intro'); // Redirect to SlideOne page
    };
    return (
        <div className="introduction-container">
            <img src={logo} className="logo" alt="Logo" style={{ width: '40px', height: 'auto' }} />
            <div className="introduction-content">
                <img src={intro} className="intro" alt="Intro" style={{ width: '260px', height: 'auto' }} />
                <p>Stop using unsecure passwords for your online accounts, level up with OnePass. Get the most secure and difficult-to-crack passwords.</p>
                <div className="pagination-container">
                <button onClick={Intro}>1</button>
                <button onClick={slideOne}>2</button>
                    <button onClick={slideTwo}>3</button>
                </div>
                <div className="button-center-intro">
                    <button onClick={handleGetRegisterClick}>REGISTER</button>
                    <button onClick={handleGetStartedClick}>LOGIN</button>
                </div>
            </div>
        </div>
    );
};

export default SlideTwo;
