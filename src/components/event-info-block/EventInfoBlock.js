import { useParams } from 'react-router-dom';
import './eventInfoBlock.css'


const EventInfoBlock = ({eventData}) => {
    const {id} = useParams();
    if(!eventData) {
        return <p style={{marginTop: "100px", textAlign: "center"}}>Завантаження...</p>
    }
    const currentEvent = eventData[id];
    return(
        <section className="test__section">
            <div className="top__content__block">
                <h1>{currentEvent.title}</h1>
            </div>
            <div className="general__content__block">
                <img src={currentEvent.urlImage} />
                {currentEvent.textInfo.map((item) => (
                    <p>{item}</p>
                ))}
            </div>
        </section>
    );
}

export default EventInfoBlock;