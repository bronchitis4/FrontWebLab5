import './chronologyList.css'
import ChronologyListItem from '../chronology-list-item/ChronologyListItem';
const ChronologyList = (props) => {
    if(!props.data)
    {
        return(
            <div className="chronology__list__container">
                <ul className="chronology__list">
                    <p style={{textAlign: "center"}}>Зачекайте...</p>
                </ul>
            </div>
        )
    }
    const data = props.data.map(item => {
        return <ChronologyListItem title={item.title} period={item.period} date={item.date} key={item.order}/>
    })

    return(
        <div className="chronology__list__container">
            <ul className="chronology__list">
               {data}
            </ul>
        </div>
    )
}

export default ChronologyList;