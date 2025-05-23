import './footer.css'
import { useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();
    if (location.pathname === "/register" || location.pathname === "/login") {
        return null;
    }

    return(
        <footer>
        <div className="contact__information">
            <h1>Зв'язатися з нами:</h1>
            <ul>
                <li><strong>Телефон:</strong><a href="tel:+380 63 720 86 24"> +380 63 720 86 24</a></li>
                <li><strong>Електронна пошта:</strong> <a href="mailto:#"> info@gmail.com</a></li>
                <li className="location__adress"><strong>Адреса:</strong> <span> Львів, вул. Шевченка, 15, Україна </span>
                    <div className="location__modal disable">
                        
                    </div>
                </li>
                <li><strong>Робочі години:</strong> <br/>Пн-Пт: 09:00 - 18:00</li>
            </ul>
        </div>
        </footer>  
    );
}

export default Footer;