// Imports
import { SyntheticEvent } from "react";
import Feature from "../models/FeatureModel";
import "./css/generalLocation.css";



// Interface
interface Props {
    styleDiv?:{};
    isMobile?:boolean;
    ratio?:number;
    features?:Feature[];
    locations:number[];
    actualLocation:number;
    url?:string;
    handleImageLoad: (e: SyntheticEvent<HTMLImageElement>) => void;
    divWidth:{
        one:{},
        two:string,
        swiper:string,
        three:{},
        descriptionLabel:{}
    };
}



// General location
const GeneralLocation: React.FC<Props> = ({...Props}) => { 
    // Constants, variables, and states
    const {isMobile, ratio, features, locations, actualLocation, url, handleImageLoad, divWidth, styleDiv} = Props;
    let photo, alt, designation, title, description = '';
    let style = {};
    

    // If it is mobile I change the size of the photo.
    if (isMobile) {
        style = {width:450, aspectRatio:ratio}
    } else {
        style = {width:559, aspectRatio:ratio}
    }
    
    
    
    features?.forEach((item, index) => {
        if(locations[index] === actualLocation) {
            photo =url + String(item.photo);
            alt = item.title   
            description = item.description;
            title = item.title;
            designation = item.designation;
        }
    })
    
    
    
    if (photo) {
        return (
            <div id="divCarFileLocationOneMain" style={{...styleDiv, ...divWidth.one}}>
                    <div id="divCarFileLocationOneImage">
                        <img 
                            src={photo} 
                            alt={alt}
                            onLoad={handleImageLoad}
                            style={style}
                        />
                    </div>

                    <div id="divCarFileLocationOneData">
                        {actualLocation === 1
                            ?
                                <label id="labelCarFileLocationOneDesignation">{designation}</label>
                            :
                                null
                        }                    
                        <label id="labelCarFileLocationOneTitle">{title}</label>
                        <label style={divWidth.descriptionLabel} id="labelCarFileLocationOneDescription">{description}</label>
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
}



// Exports
export default GeneralLocation;



