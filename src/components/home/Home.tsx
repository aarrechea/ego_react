// Imports
import { FC, useEffect, useState } from "react";
import NavBar from "../navBar/NavBar";
import ToyotaLogo from '../../images/Toyota-Logo-Master.avif';
import "./css/home.css";
import TopNavBar from "../navBar/TopNavBar";
import { useAppSelector } from "../../hooks/hooks";



// Home
const Home:FC = () => {
    // Chnaging the body background color.
    document.body.style.backgroundColor='#424242';


    // States
    const [divMainWidth, setDivMainWidth] = useState({width:'80%'});


    // Nav bar state information
    const navBarState = useAppSelector(state => state.navBar);
    

    // Use effect to avoid re-renders
    useEffect(() => {
        if(navBarState.width === '20%') {
            setDivMainWidth({width:'80%'});
        } else {
            setDivMainWidth({width:'100%'});
        }

    }, [navBarState.width])
    
    

    // Return
    return (
        <div>
            <TopNavBar/>
            <NavBar/>      
            <div id="divHomeLogo" className="divMain" style={divMainWidth}>
                <img 
                    src={ToyotaLogo} 
                    alt="Logo"   
                    id="imgHomeLogo"             
                />
            </div>                  
        </div>
    )
};



// Exports
export default Home;