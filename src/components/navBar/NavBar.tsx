// Imports
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { SyntheticEvent, useEffect, useState } from "react";
import { topNavBarActions } from "../../store/topNavBarRedux";
import "./css/navBar.css";
import useMediaQuery from "../../hooks/useMediaQuery";
import { navBarActions } from "../../store/navBarRedux";



// NavBar
function NavBar () {
    // Redux constants    
    const dispatch = useAppDispatch();    


    // To detect changes between mobile and desktop
    const isMobile = useMediaQuery("(max-width: 768px)");       


    // States
    const [buttonStyle, setButtonStyle] = useState({color:'black'});

    
    // Other constants    
    const navigate = useNavigate();
    const navBarState = useAppSelector(state => state.navBar);
    const styleNavBar = {width:navBarState.width, display:navBarState.display}
    

    // Handle click to navigate according to the menu chosen
    function handleClick(e:SyntheticEvent, menu:string) {
        const data = {menu:menu};
        navigate("/car-page");
        dispatch(topNavBarActions.change(data));
        
        if (isMobile) {
            dispatch(navBarActions.changeWidth({width:'0%'}));
            
            setTimeout(() => {
                dispatch(navBarActions.changeDisplay({display:'none'}));    
            }, 200);
        }
    };    


    // Change the color of the button text according to the width of the toolbar
    useEffect(() => {
        if(navBarState.width === '0') {
            setButtonStyle({color:'white'});
        } else {
            setTimeout(() => {
                setButtonStyle({color:'black'});    
            }, 300);
            
        }
    }, [navBarState.width]);

    
    
    // Return
    return (       
        <div style={styleNavBar} className="topnav">

            {/* First set of buttons */}
            <div id="divNavBarFirst" className="divNavBarTags">
                <button style={buttonStyle} className="btnNabBar" onClick={(e) => handleClick(e, 'models')}>Modelos</button>
                <button style={buttonStyle} className="btnNabBar">Servicios y Accesorios</button>
                <button style={buttonStyle} className="btnNabBar">Financiación</button>
                <button style={buttonStyle} className="btnNabBar">Reviews y Comunidad</button>
                                    
                <p/>                
                                                            
                <button style={buttonStyle} className="btnNabBar">Toyota Mobility Service</button>
                <button style={buttonStyle} className="btnNabBar">Toyota Gazoo Service</button>
                <button style={buttonStyle} className="btnNabBar">Toyota Híbridos</button>
                                                            
                <p/>
                                
                <button style={buttonStyle} className="btnNabBar">Concesionarios</button>
                <button style={buttonStyle} className="btnNabBar">Test Drive</button>
                <button style={buttonStyle} className="btnNabBar">Contacto</button>                
            </div>
            

            {/* Second set of buttons */}
            <div id="divNavBarActivities" className="divNavBarTags">
                <button style={buttonStyle} className="btnNabBar btnNavBarLavender">Actividades</button>
                <button style={buttonStyle} className="btnNabBar btnNavBarLavender">Servicio al Cliente</button>
                <button style={buttonStyle} className="btnNabBar btnNavBarLavender">Ventas Especiales</button>
                <button style={buttonStyle} className="btnNabBar btnNavBarLavender">Innovación</button>
                <button style={buttonStyle} className="btnNabBar btnNavBarLavender">Prensa</button>
                <button style={buttonStyle} className="btnNabBar btnNavBarLavender">Acerca de...</button>                
            </div>
        </div>
  );
}



// Exports
export default NavBar;