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
    divMargin:{        
        marginTop:string,
        marginRight:string,
        marginBotton:string,
        marginLeft:string
    };
    divWidth:{
        two:string,
        swiper:string,
        three:{},
        descriptionLabel:{}
    }
}



// General location
const GeneralLocation: React.FC<Props> = (Props) => { 
    // Constants, variables, and states
    const {isMobile, ratio, features, locations, actualLocation, url, handleImageLoad, divMargin, divWidth, styleDiv} = Props;
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
            <div id="divCarFileLocationMain" style={{marginRight:divMargin.marginRight, marginLeft:divMargin.marginLeft, ...styleDiv}}>
                    <div id="divCarFileLocationImage">
                        <img 
                            src={photo} 
                            alt={alt}
                            onLoad={handleImageLoad}
                            style={style}
                        />
                    </div>                    

                    <div id="divCarFileLocationData">
                        {designation !== '' && <label id="labelCarFileLocationDesignation">{designation}</label>}

                        <label id="labelCarFileLocationTitle">{title}</label>
                        <label style={divWidth.descriptionLabel} id="labelCarFileLocationDescription">{description}</label>
                    </div>
                </div>     
            )

    } else {
        return (
            <div id="divCarFileLocationMain">
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



