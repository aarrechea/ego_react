// User model
class Feature {
    id:number;    
    created:Date;
    updated:Date;
    photo: HTMLImageElement;    
    title:string;
    description:string;
    designation:string;
    

    constructor(
            id:number, 
            created:Date, 
            updated:Date,
            photo:HTMLImageElement,
            title:string,
            description:string,
            designation:string,
    ) 
        {
            this.id = id;
            this.created = created;
            this.updated = updated;
            this.photo = photo;            
            this.title = title;
            this.description = description;
            this.designation = designation;
        }
}



// Exports
export default Feature;



