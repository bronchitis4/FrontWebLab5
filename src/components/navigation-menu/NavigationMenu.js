
import './navigationMenu.css';
import { NavLink, useLocation } from 'react-router-dom';
import SignOutBtn from '../sign-out/sign-out';
const NavigationMenu = () => {
    const location = useLocation();

    if (location.pathname === "/register" || location.pathname === "/login") {
        return null;
    }

    return (
        <nav className="navigation__menu">
            <span className="logo"><NavLink to="/">LOGO</NavLink></span>
            <ul className="navigation__list">
                <li className="list__item"><NavLink to="/chronology">Хронологія</NavLink></li>
                <li className="list__item"><NavLink to="/events">Події</NavLink></li>
                <li className="list__item"><NavLink to="/test">Тестування</NavLink></li>
            </ul>
            {location.pathname === "/test"  ? <SignOutBtn/> : <div></div>}
        </nav>
    );
}

export default NavigationMenu;