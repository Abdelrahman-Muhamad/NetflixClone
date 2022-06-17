import React from 'react'
import axios from "axios";
import './newUser.css';

import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NewUser() {
    const [username,setName]=useState("");
    const [fullname,setFullname]=useState("");
    const [phone,setphone]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPass]=useState("");
    const [isAdmin,setIsAdmin]=useState(true);
    const [profilePic,setprofilePic]=useState("");


    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const AddUser = async (e) => {
        e.preventDefault();
        if(username!=="" && fullname !== "" && phone !=="" &&profilePic!=="" && email !=="" && password!=="")
        {
        await axios.post("http://localhost:8800/api/User/AddUser", { username, fullname,phone,email,password,profilePic,isAdmin })
        .then((res)=>{
        })
        .catch((e)=> console.log(e));
    }   
    console.log(isAdmin)
      };
  return (
    <div className='newUser'>
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm" method='Post'>
            <div className="newUserItem">
                <label>UserName</label>
                <input type="text" placeholder="Enter your username"
                 onBlur={(e)=>{
                    if(e.target.value.length<3)
                    { 
                       document.getElementById("usrErrorMsg").style.display ="block" 
                    }
                    else
                    {
                       document.getElementById("usrErrorMsg").style.display ="none"
                       setName(e.target.value)
                    }
                     }}/>
                <p id="usrErrorMsg">USERNAME CANNOT BE LESS THAN 3 CHARACTERS</p>
            </div>
            <div className="newUserItem">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" 
                onBlur={(e)=>{
                    if(isFinite(e.target.value))
                    { 
                       document.getElementById("nameErrorMsg").style.display ="block" 
                    }
                    else
                    {
                       document.getElementById("nameErrorMsg").style.display ="none"
                       setFullname(e.target.value)
                    } 
                    console.log(parseInt(e.target.value))
                    }}/>
                <p id="nameErrorMsg">FULLNAME MUST BE STRING</p>
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type="email" placeholder="Enter your E-mail" 
                onBlur={(e)=>{
                    if(!e.target.value.match(mailformat))
                    { 
                       document.getElementById("mailErrorMsg").style.display ="block" 
                    }
                    else
                    {
                       document.getElementById("mailErrorMsg").style.display ="none"
                       setEmail(e.target.value)
                    }
                    
                }}/>
                <p id="mailErrorMsg">ENTER A VALID E-MAIL</p>
            </div>
            <div className="newUserItem">
                <label>Phone number</label>
                <input type="text" placeholder="Enter your phone number" 
                onBlur={(e)=>{
                    if(isNaN(parseInt(e.target.value)))
                    { 
                       document.getElementById("numberErrorMsg").style.display ="block" 
                    }
                    else
                    {
                       document.getElementById("numberErrorMsg").style.display ="none"
                       setphone(e.target.value)
                    } 

                    }}/>
                <p id="numberErrorMsg">ENTER A VALID NUMBER</p>
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" 
                onChange={(e)=>{
                    if(e.target.value.length<8)
                    { 
                       document.getElementById("passErrorMsg").style.display ="block" 
                    }
                    else
                    {
                       document.getElementById("passErrorMsg").style.display ="none"
                       setPass(e.target.value)
                    }
                    }}/>
                <p id="passErrorMsg">PASSWORD MUST BE MORE THAN 8 CHARACTERS</p>
            </div>
            <div className="newUserItem">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm your password" 
                onChange={(e)=>{
                    if(e.target.value !== password)
                    { 
                       document.getElementById("confirmErrorMsg").style.display ="block" 
                    }
                    else
                    {
                       document.getElementById("confirmErrorMsg").style.display ="none" 
                    }
                    }}/>
                <p id="confirmErrorMsg">PASSWORD DOESN'T MATCH </p>
            </div>
            
            <div className="newUserItem">
                <label>Profile Picture</label>
                <input type="text" placeholder="Enter your picture" 
                onChange={(e)=>{ 
                       setprofilePic(e.target.value)
                    }}/> 
            </div>
            <div id="isAdminDiv" className="newUserItem">
                <label>Is Admin?</label>
                <input id="isAdminLbl" required type="radio" name="isAdmin" value="Yes" 
                onBlur={(e)=>{
                    if(e.target.checked)
                    { 
                        (setIsAdmin(true))
                    }
                    }}/>
                    <label id="isAdminLbl">Yes</label>
                    <input id="isAdminLbl" required type="radio" name="isAdmin" value="No" 
                    onBlur={(e)=>{
                        if(e.target.checked)
                        { 
                            (setIsAdmin(false))
                        }
                        
                    }}/>
                    <label id="isAdminLbl">No</label>
            </div> 
            
            <button className="newUserButton" onClick={AddUser}><NavLink className="newUsrButtonLink" to="/users">Create</NavLink></button>
        </form>
    </div>
  )
}
