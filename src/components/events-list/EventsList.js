import './eventsList.css'
import EventsListItem from '../events-list-item/EventsListItem';

const EventsList = ({eventsList}) => {
    if(!eventsList) {
        return <p style={{marginTop: "100px", textAlign: "center"}}>Завантаження...</p>
    }

    const data = eventsList.map(item => {
        return <EventsListItem title={item.title} description={item.description} urlImage={item.urlImage} id={item.id} key={item.id}/>
    })
    return(
        <section className="articles__block">
            {data}
        </section>
    )
}

export default EventsList;