import './Login.css';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { login } from "../../Context/apiCaalls";
import { NavLink } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
      };
    return ( 
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                    />
                </div>
            </div>
            <div className="Container">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder='Email or phone number' 
                onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" placeholder='password' 
                onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className="loginButton" onClick={handleLogin}>Sign In</button>
                    <span>New to Netflix? &nbsp;
                        <NavLink to="/register">
                            <b>Sign up now.</b>
                        </NavLink>
                     </span> 
                <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a
                    bot. <b>Learn more</b>.
                </small>
            </form>
            </div>
            
        </div>
        
    );
}

export default Login;