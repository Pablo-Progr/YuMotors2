import React from 'react'
import '../css/footer.css'
import { FiInstagram } from "react-icons/fi";
import logo from '../img/yu-motors-blanco.png'

const Footer = () => {
    return (
        <div className='footer-container'>
            <footer className="footer-content">
                <img className="footer-img" src={logo} alt="kia" />
                <a className="footer-instagram" aria-label="Instagram">
                    <FiInstagram />
                </a>
            </footer>
        </div>
    )
}

export default Footer