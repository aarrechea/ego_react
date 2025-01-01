// User model
class User {
    id:number;
    email:string;
    first_name:string;    
    last_name:string;
    photo: HTMLImageElement;    
    user_type:number;
    is_active:boolean;
    created:Date;
    updated:Date;

    constructor(
            id:number, 
            email:string, 
            first_name:string,             
            last_name:string, 
            photo:HTMLImageElement,
            user_type:number,
            is_active:boolean,
            created:Date, 
            updated:Date
    ) 
        {
            this.id = id;
            this.email = email;
            this.first_name = first_name;
            this.last_name = last_name;
            this.photo = photo;            
            this.user_type = user_type;
            this.is_active = is_active;
            this.created = created;
            this.updated = updated;
        }
}



// Exports
export default User;



