import React from 'react';
import './Header.css';



const Header = (props) => {
    return(
    <div className="header">
        <div className="score">Score: {props.score}</div>
        <div>
        <p className="marquee"><span>Instructions : Don't Pick The Same Card To Win !!!</span></p>
        </div>
    </div>
    )
}



export default Header;