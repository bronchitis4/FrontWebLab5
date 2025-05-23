import './eventsListItem.css';
import { NavLink } from 'react-router-dom';

const EventsListItem = (props) => {
    const {title, description, urlImage, id} = props;
    const testHref = `/test/${id}`;
    const eventHref = `/event/${id}`;
    return(
        <article className="article__item">    
        <div className="article__header"><h1>{title}</h1></div>
        <div className="article__content">
            <img src={urlImage} alt="історична подія"/>
            <p>{description}</p>
            <button type="button"><NavLink to={eventHref}>Більше</NavLink></button>
            <button className="test__btn" type="button"><NavLink to={testHref} className="test__btn__event">Тест</NavLink></button>
        </div>
        </article>
    )
}

export default EventsListItem;