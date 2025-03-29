import 'react';
import './Header.css';
import Logo from './Logo.svg';

const Header = () => {
    return (
        <>
            <header className="custom-header">
                <div className="header-content">
                    <div className="logo-section">
                        <img src={Logo} alt="Logo" className="logo" width="212" />
                        <nav className="navigation">
                            <span className="nav-item">Sueño</span>
                            <span className="nav-item">Salud</span>
                            <span className="nav-item">Entrenamiento</span>
                            <span className="nav-item">Nutrición</span>
                        </nav>
                    </div>
                    <div className="profile-icon">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                            person
                        </span>
                    </div>
                </div>
            </header>
            
        </>
    );
};

export default Header;

