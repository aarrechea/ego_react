// Impoprts
import { useLocation } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import TopNavBar from "../navBar/TopNavBar";
import "./css/carFile.css";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Car from "../models/CarModel";
import Feature from "../models/FeatureModel";
import { useAppSelector } from "../../hooks/hooks";
import useMediaQuery from "../../hooks/useMediaQuery";
import GeneralLocation from "../general/GeneralLocation";
import GeneralCarousel from "../general/GeneralCarousel";



// Car file
const CarFile = () => {
    // Data from the useNavigate parameter.
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width: 768px)");


    // Nav bar state information
    const navBarState = useAppSelector(state => state.navBar);
    const [divWidth, setDivWidth] = useState({        
        two:'80%',
        swiper:'80%',
        three:{margin:'2 auto'},
        descriptionLabel:{paddingRight:'12rem'}
    });
    const [divMargin, setDivMargin] = useState({
        marginTop:'6rem',
        marginRight:'0rem',
        marginBotton:'2rem',
        marginLeft:'2rem'
    });


    // State to hold the car
    const [carInfo, setCarInfo] = useState<Car>();
    const [features, setFeatures] = useState<Feature[]>([]);
    const [locations, setLocations] = useState<number[]>([]);
    const [ratio, setRatio] = useState<number>();


    // State to add the first part of url to the photo url
    const [url, setUrl] = useState('');
    
        
    // Base url
    const BASE_URL = process.env.REACT_APP_API_URL;        


    // Hanlde image on load
    const handleImageLoad = (e:SyntheticEvent<HTMLImageElement>) => {
        const { naturalHeight, naturalWidth } = e.currentTarget;                
        const ratio = naturalWidth / naturalHeight
        setRatio(ratio);
    };
        
    
    // Getting the car
    useEffect(() => {
        axios
            .get(`${BASE_URL}/car/${location.state.id}`)
            .then(res => {                
                setCarInfo({...res.data})
                setFeatures([...res.data.features])
                setLocations([...res.data.locations])
            })
            .catch(error => {
                console.log("Error getting the car: ", error);
            })


        // Changing the width of the divs when the side nav bar hide or show 
        if (!isMobile) {
            if (navBarState.width === '20%') {
                setDivWidth({                    
                    two:'80%',
                    swiper:'80%',
                    three:{margin:'2rem 0'},
                    descriptionLabel:{paddingRight:'12rem'}
                })
                setDivMargin(prev => {
                    return {
                        ...prev,
                        marginRight:'0rem',
                        marginLeft:'0rem'
                    }
                })
    
            } else {
                setDivWidth({                    
                    two:'100%',
                    swiper:'60%',
                    three:{margin:'0 auto'},
                    descriptionLabel:{paddingRight:'12rem'}
                })
                setDivMargin(prev => {
                    return {
                        ...prev,
                        marginRight:'auto',
                        marginLeft:'auto'
                    }
                })
            }
        } else {
            setDivWidth({                
                two:'100%',
                swiper:'60%',
                three:{margin:'2rem auto'},
                descriptionLabel:{paddingRight:'1rem'}
            })
        }


        if (process.env.REACT_APP_API_URL === "http://127.0.0.1:8000/api") {
            setUrl("http://127.0.0.1:8000");
        }

    }, [BASE_URL, location.state.id, navBarState.width, isMobile]);



    // Return
    return (
        <div id="divCarFileMain">
            <NavBar/>
            <TopNavBar/>
            
            {/* <Location loc={1}/> */}
            <GeneralLocation
                styleDiv={{marginTop:'6rem'}}
                isMobile={isMobile}
                ratio={ratio}
                features={features}
                locations={locations}
                actualLocation={1}
                url={url}
                handleImageLoad={handleImageLoad}
                divMargin={divMargin}
                divWidth={divWidth}
            />

            <GeneralCarousel
                locations={locations}
                actualLocation={2}
                url={url}
                handleImageLoad={handleImageLoad}
                ratio={ratio}
                isMobile={isMobile}
                slides={4}
                slidesMobile={1}
                divWidth={divWidth}
                features={features}
            />

            <GeneralLocation
                styleDiv={{marginTop:'0rem', flexDirection:isMobile ? 'column' : 'row-reverse'}}
                isMobile={isMobile}
                ratio={ratio}
                features={features}
                locations={locations}
                actualLocation={3}
                url={url}
                handleImageLoad={handleImageLoad}     
                divMargin={divMargin}
                divWidth={divWidth}
            />

            <GeneralLocation
                styleDiv={{marginTop:'0rem'}}
                isMobile={isMobile}
                ratio={ratio}
                features={features}
                locations={locations}
                actualLocation={4}
                url={url}
                handleImageLoad={handleImageLoad}     
                divMargin={divMargin}
                divWidth={divWidth}
            />
            
            <p className="paragraphCarFileSeparator"/>
        </div>        
    )
};



// Exports
export default CarFile;