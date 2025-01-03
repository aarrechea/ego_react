// Imports
import "./css/carCard.css";
import Car from "../models/CarModel";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { topNavBarActions } from "../../store/topNavBarRedux";
import { SyntheticEvent } from "react";



// Car card
const CarCard = (props:Car) => {
    const {price, photo, model, year, id} = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    
    // Price format
    const value = <NumericFormat 
                    className="carCardInputPrice"
                    disabled
                    value={price} 
                    decimalSeparator="," 
                    thousandSeparator="." 
                    decimalScale={0}
                />;


    // Handle car click
    function handleClick() {        
        dispatch(topNavBarActions.change({menu:'file'}))
        navigate("/car-file", {state:{id:id}});
    };



    // Return
    return (
        <div id="divCarCardMain" className="divCarCardMain" onClick={handleClick}>
            <label className="carCardLabelModel">{model}</label>
            <label className="carCardLabelYear">{year} &nbsp; | &nbsp; ${value}</label>
            <img src={String(photo)} style={{width:'250px',aspectRatio:'67/33'}} alt={model} />            
        </div>
    )
};



// Exports
export default CarCard;