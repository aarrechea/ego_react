// Imports
import { SyntheticEvent } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Feature from "../models/FeatureModel";
import "./css/generalCarousel.css";



// Props
interface Props {
    styleDiv?:{};
    isMobile?:boolean;
    ratio?:number;
    features?:Feature[];
    locations:number[];
    actualLocation:number;
    url?:string;
    slides:number;
    slidesMobile:number;
    handleImageLoad: (e: SyntheticEvent<HTMLImageElement>) => void;
    divWidth:{
        two:string,
        swiper:string,
        three:{},
        descriptionLabel:{}
    }
}



// Data types
type carousel = {
    photo:string, 
    alt:string, 
    description:string, 
    title:string
}



// General carousel
const GeneralCarousel: React.FC<Props> = (Props) => { 
    // Props
    const {isMobile, ratio, features, locations, actualLocation, url, handleImageLoad, divWidth,
        slides, slidesMobile} = Props;


    let carousel:carousel[] = [];
    let slidesPerView = slides;

    if (isMobile) {
        slidesPerView = slidesMobile;
    }


    features?.forEach((item, index) => {            
        if(locations[index] === actualLocation) {    
                            
            const obj = {
                'photo':url + String(item.photo),
                'alt':item.title,
                'description':item.description,
                'title':item.title
            }

            carousel.push(obj);
        }            
    })



    // Return
    return (
        <div id="divCarouselMain" style={{width:divWidth.two}}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true, dynamicBullets:true, dynamicMainBullets:2 }}
                spaceBetween={8}                
                slidesPerView={slidesPerView}
                onSlideChange={() => console.log('slide change')}
                id="swiperCarousel"
                style={{width:divWidth.swiper}}
            >
                {carousel.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="divSwiperCarouselMain">
                            <div style={{textAlign:'center'}}>
                                <img 
                                    src={item.photo} 
                                    alt={item.alt}
                                    onLoad={handleImageLoad}
                                    style={{width:268, aspectRatio:ratio}}
                                />
                            </div>
                            
                            <div className="divCarouselData">
                                <label className="labelCarouselTitle">{item.title}</label>
                                <label className="labelCarouselDescription">{item.description}</label>
                            </div>
                        </div>                            
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>            
    )
};



// Exports
export default GeneralCarousel;






