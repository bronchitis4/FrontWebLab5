import { useState } from 'react';
import './listFilter.css'

const ListFilter = (props) => {

    const filters = [
        "Київська Русь",
        "Монгольська навала та Литва",
        "Козацька доба",
        "Національні рухи та автономія",
        "Революції та боротьба за незалежність",
        "Сучасна історія",
        "Усі"
    ];

    function generatedList() {
        return filters.map((item, i) => {
            let classN = "list__filten__btn";
            if(item == props.filter) 
                classN = "list__filten__btn active";

            return <button onClick={() => props.OnChangeFilter(item)} className={classN} key={i}>{item}</button>
        })
    }

    return (
        <div className="list__filter">
            {generatedList()}
        </div>
    )   
}

export default ListFilter;