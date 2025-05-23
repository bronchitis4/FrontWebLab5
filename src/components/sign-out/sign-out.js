import { useNavigate, NavLink } from "react-router-dom"
import { auth } from "../../firebase"
import { signOut } from "firebase/auth"
import './sign-out.css'


const SignOutBtn = () => {
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Користувач вийшов!")
        }catch(e) {
            console.log(e.message);
            return e.message;
        }
        
    }

    return(
        <NavLink to="/login" onClick={handleSignOut} className="sign__out">Вийти</NavLink>
    )
}

export default SignOutBtn;