import React from 'react';
import Register from '../../components/auth/Register/Register';
import './Register.css';


class RegisterPage extends React.Component {
    state = {}

    render(){
        return(<div className="regPage">
         
            <div className="regTitle">REGISTER</div>
                <Register/>
            

        </div>)
    }
}



export default RegisterPage