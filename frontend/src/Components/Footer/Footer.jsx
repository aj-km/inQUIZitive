import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section logo">
                    <img src="logo.png" alt="Website Logo" />
                    <h2>Website Name</h2>
                </div>
                <div className="footer-section info">
                    <h3>About Us</h3>
                    <p>Information about the website...</p>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <form>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <textarea placeholder="Message"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
