import './platformDescription.css'
import { NavLink } from 'react-router-dom';

const PlatformDescription = () => {
    return(
        <section id="generalInfo">
            <div className="background__image"></div>
            <div className="info__box">
                <h1>ІСТОРІЯ ОРГАНІЗАЦІЇ</h1>
                <p>Історія нашої організації бере свій початок ще на початку XX століття. Вона ґрунтується на традиціях служіння громаді, лідерства та освіти. Протягом років ми розвивалися, впроваджували інновації та зміцнювали дух єдності й прогресу.</p>
                <button type="button"><NavLink to="/events">Розпочати</NavLink></button>
            </div>
        </section>
    )
}

export default PlatformDescription;