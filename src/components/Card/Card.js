import React from 'react';
import './Card.css';



const Card = (props) => {
    return(<div className="card" onClick={()=> props.handleClick(props.id)}> <img className="img" src={props.img}></img></div>)
}



export default Card;