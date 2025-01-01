// Imports
import "./css/topNavBar.css";
import EgoLogo from  "../../images/navBar/Logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useCallback, useEffect, useState } from "react";
import { navBarActions } from "../../store/navBarRedux";
import { useNavigate } from "react-router-dom";
import { topNavBarActions } from "../../store/topNavBarRedux";
import useMediaQuery from "../../hooks/useMediaQuery";



// Top nav bar
const TopNavBar = () => {
    // Redux constants    
    const dispatch = useAppDispatch();    


    // Nav bar state information
    const navBarState = useAppSelector(state => state.navBar);
    
    
    // Constants
    const navigate = useNavigate();       
    const isMobile = useMediaQuery("(max-width: 768px)");
    

    // states
    const [url, setUrl] = useState<string>('home');    
    const [labelStyles, setLabelStyles] = useState({
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width: '9rem',
        height: '100%',
        fontSize: '1.5rem',
        models: {
            borderBottom:'5px solid red',
            marginLeft:'3rem',
        },
        file:{
            borderBottom:'none'
        }
    })    
    
    
    // Change the side nav bar display and width attributes
    const ChangeNavBarAttributes = useCallback(() => {
        if(parseInt(navBarState.width) > 0) {
            dispatch(navBarActions.changeWidth({width:'0%'}));

            setTimeout(() => {
                dispatch(navBarActions.changeDisplay({display:'none'}));    
            }, 200);
            
        } else { 
            if (isMobile) {
                dispatch(navBarActions.changeWidth({width:'100%'}));
            } else {
                dispatch(navBarActions.changeWidth({width:'20%'}));
            }

            setTimeout(() => {
                dispatch(navBarActions.changeDisplay({display:'flex'}));
            }, 200);       
        }

    }, [dispatch, navBarState, isMobile]);


    // Hanlde click to hide or show the lateral bar. Using ChangeNavBarAttributes component.
    function handleClick() {
        ChangeNavBarAttributes();        
    };


    // Create the correspondant button    
    const ButtonBar = ():JSX.Element => {        
        if(parseInt(navBarState.width) > 0) {
            return (
                <button
                    onClick={handleClick}
                >                
                    Cerrar &nbsp;
                    
                    <span>                    
                        <IoMdClose
                            style={{fontSize:'1.4rem'}}
                        />
                    </span>                
                </button>            
            )

        } else {
            return (
                <button
                    onClick={handleClick}
                >
                    Menu &nbsp;

                    <span>                    
                        <GiHamburgerMenu
                            style={{fontSize:'1.2rem'}}
                        />
                    </span>                
                </button>            
            )
        }                  
    };


    // Create labels
    const LabelsBar = ():JSX.Element => {        
        return (
            <>
                <label
                    style={{
                        display:labelStyles.display,
                        alignItems:labelStyles.alignItems,
                        justifyContent:labelStyles.justifyContent,
                        width:labelStyles.width, 
                        height:labelStyles.height,
                        marginLeft:labelStyles.models.marginLeft,
                        borderBottom:labelStyles.models.borderBottom,
                    }}
                >
                    Modelos
                </label>
                
                <label
                    style={{
                        display:labelStyles.display,
                        alignItems:labelStyles.alignItems,
                        justifyContent:labelStyles.justifyContent,
                        width:labelStyles.width, 
                        height:labelStyles.height,
                        marginLeft:labelStyles.models.marginLeft,
                        borderBottom:labelStyles.file.borderBottom,
                    }}
                >
                    Ficha del modelo
                </label>
            </>                
        )
    }


    // Handle logo click
    function handleLogoClick() {
        navigate("/");
        dispatch(topNavBarActions.change({menu:'home'}))
    };
    

    // Use effect to change the size of the side bar when the width of the window
    // change the mobile threshold. The bar wil be hide on each threshold change.
    useEffect(() => {
        if(isMobile) {
            dispatch(navBarActions.changeWidth({width:'0%'})); 

            setTimeout(() => {
                dispatch(navBarActions.changeDisplay({display:'none'}));
            }, 200);
        } 

    }, [isMobile, dispatch])
    

    // Change the menu underline in the top nav bar
    useEffect(() => {                
        setUrl(window.location.href);        
        
        if(!isMobile) {
            if((window.location.href === "http://127.0.0.1:3000/car-page" || 
                window.location.href === "http://localhost:3000/car-page")            
            ) {
                setLabelStyles(prev => {
                    return {
                        ...prev,  
                        models:{borderBottom:'5px solid red', marginLeft:'3rem'},
                        file:{borderBottom:'none'}
                    }
                });
    
            } else if ((window.location.href === "http://127.0.0.1:3000/car-file" ||
                window.location.href === "http://localhost:3000/car-file")            
            ) {
                setLabelStyles(prev => {
                    return {
                        ...prev,  
                        models:{borderBottom:'none', marginLeft:'3rem'},
                        file:{borderBottom:'5px solid red'}
                    }
                });
    
            } else {
                setUrl("home");
            }      
        } else {
            setUrl("home");
        }

    }, [url, isMobile]);
    


    // Return
    return (
        <div id="divTopNavBarMain">
            <img 
                src={EgoLogo} 
                alt="Logo"
                onClick={handleLogoClick}
                id="imgTopNavBarEgoLogo"
            />

            {url !== 'home'
                ?
                    <LabelsBar/>
                :
                    null
            }

            <ButtonBar/>      
        </div>
    )
};



// Exports
export default TopNavBar;