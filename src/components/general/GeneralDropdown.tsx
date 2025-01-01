// Imports
import { MouseEventHandler } from "react";
import "./css/generalDropdown.css";



// Input interface
interface Props {    
    onClick?:MouseEventHandler<HTMLButtonElement>;
    style?:{};
    className?:string;
    id?:string;    
    disabled?:boolean;    
}



// Dropdown
const GeneralDropdown:React.FC<Props> = ({...Props}) => {
    return (
        <div className="dropdown">
            <button className="dropbtn">Ordenar por</button>
            
            <div className="dropdown-content">
                <button
                    value={'nada'}
                    onClick={Props.onClick}
                    className="btnCarPageOption">Nada
                </button>
                
                <button
                    onClick={Props.onClick} 
                    className="btnCarPageOption">De <span>menor</span> a <span>mayor</span> precio
                </button>
                
                <button
                    onClick={Props.onClick} 
                    className="btnCarPageOption">De <span>mayor</span> a <span>menor</span> precio
                </button>
                
                <button
                    onClick={Props.onClick}
                    className="btnCarPageOption">Más <span>nuevos</span> primero
                </button>
                
                <button
                    onClick={Props.onClick} 
                    className="btnCarPageOption">Más <span>viejos</span> primero
                </button>
            </div>
        </div>
    )
};

// General input
/* const GeneralInput: React.FC<Props> = ({...Props}) => { 
    return (
        <input {...Props}/>         
    );
} */



// Exports
export default GeneralDropdown;