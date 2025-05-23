import './testBtn.css'
import { NavLink } from 'react-router-dom';

const TestBtn = ({id, style}) => {
    const href = `/test/${id}`;
    return(
        <NavLink to={href} style={style} className="test__button">#{id + 1}</NavLink>
    )
}

export default TestBtn;