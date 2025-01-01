// Imports
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import NavBar from "../navBar/NavBar";
import TopNavBar from "../navBar/TopNavBar";
import "./css/carPage.css";
import axios from "axios";
import Car from "../models/CarModel";
import CarCard from "./CarCard";
import useMediaQuery from "../../hooks/useMediaQuery";



// Car page
const CarPage = () => {            
    // Const
    const isMobile = useMediaQuery("(max-width: 768px)");


    // States
    const [divMainWidth, setDivMainWidth] = useState({width:'80%'});
    const [cars, setCars] = useState<Car[]>([]);       
    const [typeNumber, setTypeNumber] = useState(0);
    const [btnStyle, setBtnStyle] = useState({
        todos:{backgroundColor:'lavender'},
        autos:{backgroundColor:'white'},
        pick:{backgroundColor:'white'},
        suv:{backgroundColor:'white'},
    })    


    // Use ref    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const typeOfCarDropdownRef = useRef<HTMLDivElement>(null);    


    // Base url
    const BASE_URL = process.env.REACT_APP_API_URL;


    // Nav bar state information
    const navBarState = useAppSelector(state => state.navBar);


    // Hanlde button click to change the order of the car according the button clicked
    function handleButtonClick(e:SyntheticEvent<HTMLButtonElement>, data:string) {    
        if(Object.keys(cars).length > 0) {            
            switch (data) {
                case 'nada':
                    cars.sort((a, b) => a.id - b.id)
                    break;
                case 'menor':
                    cars.sort((a, b) => a.price - b.price)
                    break;
                case 'mayor':
                    cars.sort((a, b) => b.price - a.price)
                    break;                
                case 'nuevo':
                    cars.sort((a, b) => b.year - a.year)
                    break;                        
                default:
                    cars.sort((a, b) => a.year - b.year)
                    break;
            }            

            setCars([...cars]);            
        }
    };


    // Dropdown menu to choose different car ordering
    const DropDown = () => {
        return (
            <div className="dropdown">
                <button className="dropbtn">Ordenar por</button>
                
                <div className="dropdown-content" ref={dropdownRef}>

                    <button
                        onClick={(e) => handleButtonClick(e, 'nada')}
                        className="btnCarPageOption">Nada</button>
                    <button 
                        onClick={(e) => handleButtonClick(e, 'menor')}
                        className="btnCarPageOption">De <span>menor</span> a <span>mayor</span> precio</button>
                    <button 
                        onClick={(e) => handleButtonClick(e, 'mayor')}
                        className="btnCarPageOption">De <span>mayor</span> a <span>menor</span> precio</button>
                    <button 
                        onClick={(e) => handleButtonClick(e, 'nuevo')}
                        className="btnCarPageOption">Más <span>nuevos</span> primero</button>
                    <button 
                        onClick={(e) => handleButtonClick(e, 'viejo')}
                        className="btnCarPageOption">Más <span>viejos</span> primero</button>
                </div>
            </div>
        )        
    };
 

    // Type of car filters - Mobile component filter
   const TypeOfCarDropdown = () => {
        return (
            <div className="dropdown">
                <button className="dropbtn">Filtrar por</button>
                
                <div className="dropdown-content" ref={typeOfCarDropdownRef}>

                    <button
                        onClick={(e) => handleClick(e, 'todos')}
                        className="btnCarPageOption">Todos</button>
                    <button 
                        onClick={(e) => handleClick(e, 'autos')}
                        className="btnCarPageOption">Autos</button>
                    <button 
                        onClick={(e) => handleClick(e, 'pick')}
                        className="btnCarPageOption">Pickups y Comerciales</button>
                    <button 
                        onClick={(e) => handleClick(e, 'suv')}
                        className="btnCarPageOption">SUVs y Crossovers</button>                    
                </div>
            </div>
        )        
    };


    // Simple filter by type - full size screen component filter
    const FilterByType = () => {
        return (
            <>
                <label id="labelCarPageFilters">Filtrar por</label>
                <button 
                    style={btnStyle.todos}
                    className="btnCarPageFilters" 
                    onClick={(e) => handleClick(e, 'todos')}
                >
                    Todos
                </button>
                
                <button 
                    style={btnStyle.autos}
                    className="btnCarPageFilters" 
                    onClick={(e) => handleClick(e, 'autos')}
                >
                    Autos
                </button>
                
                <button 
                    style={btnStyle.pick}
                    className="btnCarPageFilters" 
                    onClick={(e) => handleClick(e, 'pick')}
                >
                    Pickups y Comerciales
                </button>
                
                <button 
                    style={btnStyle.suv}
                    className="btnCarPageFilters" 
                    onClick={(e) => handleClick(e, 'suv')}
                >
                    SUVs y Crossovers
                </button>
            </>
            
        )
    }


    // Filters - Handle click buttons to choose the type of car showed
    function handleClick(e:SyntheticEvent, type:string) {
        let temp = btnStyle;        

        switch (type) {
            case 'todos':
                setTypeNumber(0)                
                break;

            case 'autos':
                setTypeNumber(1)                
                break;

            case 'pick':
                setTypeNumber(2)                
                break;

            default:
                setTypeNumber(3)                
                break;
        }


        Object.keys(btnStyle).forEach(function(item) {            
            if(item === type) {
                temp[item as keyof typeof btnStyle] = {backgroundColor:'lavender'}
                
            } else {                
                temp[item as keyof typeof btnStyle] = {backgroundColor:'white'}
            }

            setBtnStyle({...temp});
        });       
    };
        

    // Use effect to avoid re-renders
    useEffect(() => {
        if(navBarState.width === '20%') {
            setTimeout(() => {
                setDivMainWidth({width:'80%'});    
            }, 150);
            
        } else {
            setDivMainWidth({width:'100%'});
        }

        // Getting the cars
        axios
            .get(`${BASE_URL}/car`, { params: {data:typeNumber}})            
            .then(res => {                
                setCars([...res.data]);
            })
            .catch(error => {
                console.log("Error in getting the cars: ", error);
            })

    }, [navBarState.width, BASE_URL, typeNumber])
    


    // Return
    return (
        <div className="divMain">
            <TopNavBar/>
            <NavBar/>


            {/* Title */}
            <div 
                style={divMainWidth} 
                id="divCarPageMain"                 
            >
                <div id="divCarPageTitle">
                    <h1>Descubrí todos los modelos</h1>
                </div>


                {/* Filters and order */}
                <div id="divCarPageFilters">

                    {isMobile 
                        ?
                            <TypeOfCarDropdown/>
                        :
                            <FilterByType/>
                    }
                    
                    <DropDown/>
                </div>


                <hr id="carPageRule"/>


                {/* Car list */}
                <div id="divCarPageList">
                    {Object.keys(cars).length === 0
                        ?
                            <h3 style={{width:'100%', textAlign:'center'}}>No hay autos con el filtro seleccionado</h3>
                        :
                            cars.map((item, index) => {                        
                                return (                                                                         
                                    <CarCard
                                        key={item.id}
                                        model={item.model}
                                        photo={item.photo}
                                        price={item.price}
                                        year={item.year}
                                        id={item.id}
                                    />
                                )
                                
                            })
                    }
                </div>
            </div>            
        </div>
    )
};



// Exports
export default CarPage;