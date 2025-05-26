import './navigationMenu.css';
import { NavLink, useLocation } from 'react-router-dom';
import SignOutBtn from '../sign-out/sign-out';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const NavigationMenu = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); 
    }, [auth]);

    return (
        <nav className="navigation__menu">
            <span className="logo"><NavLink to="/">LOGO</NavLink></span>

            {(location.pathname !== "/register" && location.pathname !== "/login") && (
                <ul className="navigation__list">
                    <li className="list__item"><NavLink to="/chronology">Хронологія</NavLink></li>
                    <li className="list__item"><NavLink to="/events">Події</NavLink></li>
                    <li className="list__item"><NavLink to="/test">Тестування</NavLink></li>
                </ul>
            )}

            {location.pathname !== "/register" && location.pathname !== "/login" ? 
            (<div className="navigation__right">
                {user  ? (
                    location.pathname === "/test" &&  <SignOutBtn />
                ) : (
                    <NavLink className="login__btn" to="/login">Увійти</NavLink>
                )}
            </div>
            ) : null}
        </nav>
    );
};

export default NavigationMenu;
