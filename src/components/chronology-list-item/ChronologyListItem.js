import './chronologyListItem.css'

const ChronologyListItem = (props) => {
    return(
        <li className="chronology__list__item">
            <h1 className="event__title">Подія: {props.title}</h1>
            <p className="event__period"><b>Період: {props.period}</b></p>
            <p className="event__date">{props.date}</p>
        </li>
    );
}

export default ChronologyListItem;