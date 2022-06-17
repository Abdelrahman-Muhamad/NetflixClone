import React, { useState } from 'react'
import './topBar.css' 
import {NotificationsNone} from '@material-ui/icons';
import {Settings} from '@material-ui/icons';
import {Language} from '@material-ui/icons';
import { useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";

export default function Topbar() {
  const [profilePic,setPic]=useState(null);
  const [_id,setid]=useState(null);
  const navigate = useNavigate();


  useEffect(()=>{
    fetch(`http://localhost:8800/api/User/Users`)
    .then((response)=>{return response.json()})
    .then((data)=>{
        const admins=data.filter(item=>item.isAdmin==true);
        setPic(admins[0].profilePic);
        setid(admins[0]._id);
    })
    .catch((err)=>{console.log(err)})
  },[])
  return(
  <div className="topBar">
    <div className="topBarWrapper">
      <div className="topLeft">
        <span className="logo">
          Netflex Admin panel
        </span>
      </div> 
      <div className="topRight">
    
        <div className="iconsContainer">
        <Link to={"/user/"+_id}>
        <Settings  /> 
              </Link>
        </div>
        <img src={profilePic}  alt="avatar" className="avatarPic"/>
      </div>
    </div> 
  </div>
  );
}