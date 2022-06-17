import { useRef, useState,useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Login from '../login/Login';
import './Register.css';

function Register() {
    const[email,setEmail]=useState("")
    const [emailDone, setEmailDone] = useState(false);
    const[password,setPassword]=useState("")
    const [username, setUsername] = useState("");
    const history = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();


    const handleStart=()=>{
         //setEmail(emailRef.current.value)
         setEmailDone(true);
         
    }
    const handleFinish = async (e) => {
        // e.preventDefault();
        // setPassword(passwordRef.current.value);
        // setUsername(usernameRef.current.value);
        try {
          await axios.post("auth/register", { email,username, password }).then(history("/login"));
         
        } catch (err) {}
      };

      useEffect(()=>{
      }, [email, password, username]);
      
    return ( 
        
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        
                    />
                 
                        <NavLink to="/login" >
                          <button className="loginButton"  >
                             Sign In 
                            </button>
                        </NavLink>

                             
                    
                </div>
            </div>
            <div className="container ">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                Ready to watch? Enter your email to create or
                <NavLink to=""> restart your membership. </NavLink>
                </p>
                {!emailDone ? (
                <div className="input">
                    <input type="email" placeholder="Email address" onChange={(e)=>{setEmail(e.target.value)}} />
                    <button className="registerButton" onClick={handleStart}>Start</button>
                    
                </div>
                ):( <form className="input">
                          <input type="username" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} />
                        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        <button className="registerButton" onClick={handleFinish}>
                            Start </button>
                    </form>)}
            </div>
            
        </div>
        
    );
}

export default Register;