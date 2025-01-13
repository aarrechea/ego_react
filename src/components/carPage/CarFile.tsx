// Impoprts
import { useLocation } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import TopNavBar from "../navBar/TopNavBar";
import "./css/carFile.css";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Car from "../models/CarModel";
import Feature from "../models/FeatureModel";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAppSelector } from "../../hooks/hooks";
import useMediaQuery from "../../hooks/useMediaQuery";



// Data types
type location = {
    loc:number,
}

type carousel = {
    photo:string, 
    alt:string, 
    description:string, 
    title:string
}



// Car file
const CarFile = () => {
    // Data from the useNavigate parameter.
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width: 768px)");


    // Nav bar state information
    const navBarState = useAppSelector(state => state.navBar);
    const [divWidth, setDivWidth] = useState({
        one:{padding:'8% 8% 4% 8%'},
        two:'80%',
        swiper:'80%',
        three:{margin:'2 auto'},        
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
        

    // Location one
    const Location:FC<location> = ({loc}) => {
        let style = {};

        if (isMobile) {
            style = {width:450, aspectRatio:ratio}
        } else {
            style = {width:559, aspectRatio:ratio}
        }


        let photo, alt, designation, title, description = '';
        
        features?.forEach((item, index) => {
            if(locations[index] === loc) {
                photo =url + String(item.photo);
                alt = item.title   
                description = item.description;
                title = item.title;
                designation = item.designation;
            }
        })


        useEffect(() => {
            if (process.env.REACT_APP_API_URL === "http://127.0.0.1:8000/api") {
                setUrl("http://127.0.0.1:8000");
            }
        }, [])


        if (photo) {
            return (
                <div id="divCarFileLocationOneMain" style={divWidth.one}>
                        <div id="divCarFileLocationOneImage">
                            <img 
                                src={photo} 
                                alt={alt}
                                onLoad={handleImageLoad}
                                style={style}
                            />
                        </div>

                        <div id="divCarFileLocationOneData">
                            {loc === 1
                                ?
                                    <label id="labelCarFileLocationOneDesignation">{designation}</label>
                                :
                                    null
                            }                    
                            <label id="labelCarFileLocationOneTitle">{title}</label>
                            <label id="labelCarFileLocationOneDescription">{description}</label>
                        </div>
                    </div>     
                )

        } else {
            return (
                <div id="divCarFileLocationOneMain" style={divWidth.one}>
                    <h1 
                        style={{textAlign:'center', width:'100%'}}
                    >
                        No hay datos sobre este auto aún.
                    </h1>
                </div>
                
            )
        }                
    };


    // Location two - Carousel
    const LocationTwo = () => {
         // State to add the first part of url to the photo url
        const [url, setUrl] = useState('');


        let carousel:carousel[] = [];
        let slidesPerView = 4;

        if (isMobile) {
            slidesPerView = 1;
        }

        features?.forEach((item, index) => {            
            if(locations[index] === 2) {    
                                
                const obj = {
                    'photo':url + String(item.photo),
                    'alt':item.title,
                    'description':item.description,
                    'title':item.title
                }

                carousel.push(obj);
            }            
        })


        useEffect(() => {
            if (process.env.REACT_APP_API_URL === "http://127.0.0.1:8000/api") {
                setUrl("http://127.0.0.1:8000");
            }
        }, [])


        return (
            <div id="divCarFileLocationTwoMain" style={{width:divWidth.two}}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}                    
                    spaceBetween={8}
                    slidesPerView={slidesPerView}
                    onSlideChange={() => console.log('slide change')}
                    id="swiperCarFileLocationTwo"
                    style={{width:divWidth.swiper}}
                >
                    {carousel.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="divSwiperMain">
                                <div style={{textAlign:'center'}}>
                                    <img 
                                        src={item.photo} 
                                        alt={item.alt}
                                        onLoad={handleImageLoad}
                                        style={{width:268, aspectRatio:ratio}}
                                    />
                                </div>
                                
                                <div className="divCarFileLocationTwoData">
                                    <label className="labelCarFileLocationTwoTitle">{item.title}</label>
                                    <label className="labelCarFileLocationTwoDescription">{item.description}</label>
                                </div>
                            </div>                            
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>            
        )
    };


    // Location three
    const LocationThree = () => {
         // State to add the first part of url to the photo url
        const [url, setUrl] = useState('');


        let style = {};

        if (isMobile) {
            style = {width:450, aspectRatio:ratio}
        } else {
            style = {width:559, aspectRatio:ratio}
        }


        let photo, alt, title, description = '';
        
        features?.forEach((item, index) => {
            if(locations[index] === 3) {
                photo =url + String(item.photo);
                alt = item.title   
                description = item.description;
                title = item.title;                
            }
        })


        useEffect(() => {
            if (process.env.REACT_APP_API_URL === "http://127.0.0.1:8000/api") {
                setUrl("http://127.0.0.1:8000");
            }
        }, [])

        
        return (
            <div id="divCarFileLocationThreeMain" style={divWidth.three}>
                {isMobile 
                    ?
                    <>
                        <div>
                            <img 
                                src={photo} 
                                alt={alt}
                                onLoad={handleImageLoad}
                                style={style}
                            />
                        </div>

                        <div id="divCarFileLocationThreeData">                    
                            <label id="labelCarFileLocationThreeTitle">{title}</label>
                            <label id="labelCarFileLocationThreeDescription">{description}</label>
                        </div>
                    </>

                    :
                    <>
                        <div id="divCarFileLocationThreeData">                    
                            <label id="labelCarFileLocationThreeTitle">{title}</label>
                            <label id="labelCarFileLocationThreeDescription">{description}</label>
                        </div>

                        <div>
                            <img 
                                src={photo} 
                                alt={alt}
                                onLoad={handleImageLoad}
                                style={{width:559, aspectRatio:ratio}}
                            />
                        </div>
                    </>                    
                }
            </div>            
        )
    };


    // Location four
    const LocationFour = () => {
        // State to add the first part of url to the photo url
        const [url, setUrl] = useState('');


        let style = {};

        if (isMobile) {
            style = {width:450, aspectRatio:ratio}
        } else {
            style = {width:559, aspectRatio:ratio}
        }

        let photo, alt, title, description = '';
        
        features?.forEach((item, index) => {
            if(locations[index] === 4) {
                photo =url + String(item.photo);
                alt = item.title   
                description = item.description;
                title = item.title;                
            }
        })


        useEffect(() => {
            if (process.env.REACT_APP_API_URL === "http://127.0.0.1:8000/api") {
                setUrl("http://127.0.0.1:8000");
            }
        }, [])

                
        return (
            <div id="divCarFileLocationFourMain" style={divWidth.three}>
                <div id="divCarFileLocationFourImage">
                    <img 
                        src={photo} 
                        alt={alt}
                        onLoad={handleImageLoad}
                        style={style}
                    />
                </div>

                <div id="divCarFileLocationFourData">                    
                    <label id="labelCarFileLocationFourTitle">{title}</label>
                    <label id="labelCarFileLocationFourDescription">{description}</label>
                </div>                
            </div>            
        )
    };


    // Getting the car
    useEffect(() => {
        axios
            .get(`${BASE_URL}/car/${location.state.id}`)
            .then(res => {
                //console.log("res data: ", res.data);
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
                    one:{padding:'8% 8% 4% 8%'},
                    two:'80%',
                    swiper:'80%',
                    three:{margin:'2rem 0'}
                })
    
            } else {
                setDivWidth({
                    one:{padding:'8% 13% 4% 13%'},
                    two:'100%',
                    swiper:'60%',
                    three:{margin:'0 auto'}                
                })
            }
        } else {
            setDivWidth({
                one:{padding:'0%'},
                two:'100%',
                swiper:'60%',
                three:{margin:'2rem auto'}                
            })
        }        

    }, [BASE_URL, location.state.id, navBarState.width, isMobile]);



    // Return
    return (
        <div id="divCarFileMain">
            <NavBar/>
            <TopNavBar/>
            
            <Location loc={1}/>            
            <LocationTwo/>
            <LocationThree/>
            <LocationFour/>

            <p className="paragraphCarFileSeparator"/>
        </div>        
    )
};



// Exports
export default CarFile;