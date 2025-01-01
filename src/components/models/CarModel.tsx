// Imports
import Feature from "./FeatureModel";



// User model
class Car {
    id:number;
    created?:Date;
    updated?:Date;
    manufacturer?:string;
    model:string;
    designation?:string;
    year:number;
    type?:number;
    price:number;
    photo?:HTMLImageElement;
    features?:Feature
    

    constructor(
            id:number, 
            created:Date, 
            updated:Date,
            manufacturer:string,
            model:string,
            designation:string,
            year:number,
            type:number,
            price:number,
            photo:HTMLImageElement,
            features:Feature                        
    ) 
        {
            this.id = id;
            this.created = created;
            this.updated = updated;
            this.manufacturer = manufacturer;
            this.model = model;
            this.designation = designation;
            this.year = year;
            this.type = type;
            this.price = price;
            this.photo = photo;            
            this.features = features;            
        }
}



// Exports
export default Car;



