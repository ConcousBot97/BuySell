import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Home(){
    const navigate = useNavigate()
   useEffect(() => {
           if(!localStorage.getItem('token')){
            navigate('/login')
           }
   }, [])

    return(
        <div>
        <Header/>
        Welcome to home...
    </div>
    )
 
}

export default Home;