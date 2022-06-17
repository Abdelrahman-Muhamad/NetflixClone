
import {  DropdownButton,Dropdown } from 'react-bootstrap';
import React, { useState,useContext } from 'react'
import "./NavBar.css"
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import { logout } from "../../Context/AuthActions";



const NavBar =()=> {
    // To change the color of the navbar background on scrolling
    const [isScrolled,setIsScrolled]= useState(false);
    const { dispatch } = useContext(AuthContext);

    window.onscroll=()=>{
        setIsScrolled(window.pageYOffset === 0?false:true);
        return ()=>{window.onscroll =null}
    }
    /////////////////////////////////////////////////////////////////////////
  //The render of the page
return(
    <div className={isScrolled?"navbar scrolled":"navbar"}>
        <div className='container'>
            {/* Left Side contains Logo and watching options */}
            <div className='left'> 
            <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt=''/>
            <NavLink to="/" className="link">
            <span>Home Page</span>
            </NavLink>
            <NavLink to="/movies" className="link">
            <span>Movies</span>
            </NavLink>
            <NavLink to="/Series" className="link">
            <span>Series</span>
            </NavLink>
            <span>New</span>
            </div>
             {/* right Side contains user options, search and notification */}
            <div className='right'>
            <i className="glyphicon glyphicon-search icon"></i>
            <span>KID</span>
            <i className="glyphicon glyphicon-bell icon"></i>
            <img
            className="UserImage"
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <DropdownButton  id="dropdown-button-example1 icon" variant="secondary" title="" >
            <Dropdown.Item ><NavLink to="/pay">Payment plan</NavLink></Dropdown.Item>
            <Dropdown.Item ><span onClick={() => dispatch(logout())}>Logout</span></Dropdown.Item>
            </DropdownButton>
           
            </div>
        </div>
    </div>
)
}

export default NavBar;