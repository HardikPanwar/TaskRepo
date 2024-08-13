import React from 'react';
import './style.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <h2>Connect with us</h2>
                <div className="subscribe">
                    <input type="email" placeholder="Enter email address" />
                    <button>Subscribe</button>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-section">
                    <h4 className='logo'>TUF+</h4>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Career</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="#">Customer Support</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Free eBooks</a></li>
                        <li><a href="#">Development Tutorial</a></li>
                        <li><a href="#">Youtube Playlist</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Links</h4>
                    <ul>
                        <li><a href="#">Free eBooks</a></li>
                        <li><a href="#">Development Tutorial</a></li>
                        <li><a href="#">Youtube Playlist</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
