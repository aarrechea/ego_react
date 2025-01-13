// Imports
import "./css/carCard.css";
import Car from "../models/CarModel";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { topNavBarActions } from "../../store/topNavBarRedux";
import { SyntheticEvent, useEffect, useState } from "react";



// Car card
const CarCard = (props:Car) => {
    const {price, photo, model, year, id} = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [url, setUrl] = useState('');


    

    
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


    useEffect(() => {
        if (process.env.REACT_APP_API_URL === "http://127.0.0.1:8000/api") {
            setUrl("http://127.0.0.1:8000");
        }
    }, [])



    // Return
    return (
        <div id="divCarCardMain" className="divCarCardMain" onClick={handleClick}>
            <label className="carCardLabelModel">{model}</label>
            <label className="carCardLabelYear">{year} &nbsp; | &nbsp; ${value}</label>
            <img src={url + String(photo)} style={{width:'250px',aspectRatio:'67/33'}} alt={model} />
        </div>
    )
};



// Exports
export default CarCard;