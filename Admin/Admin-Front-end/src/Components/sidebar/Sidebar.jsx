import { LineStyle, Person, Movie } from '@material-ui/icons'

import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
export default function sidebar() {
  return (
    <div className="sideBar">
        <div className="sideBarWrapper">
            <div className="sideBarMenu">
                <h3 className="sideBarTitle"> Dashboard </h3>
                <ul className="sideBarList">
                    <Link to="/" className='link'>
                        <li className="sideBarListItem active">
                            <LineStyle className="sideBarIcon"/>
                            Home
                        </li>
                    </Link>
                    {/* <li className="sideBarListItem">
                        <TrendingUp className="sideBarIcon"/>
                        Sales
                    </li>                     */}
                </ul>
            </div>
            <div className="sideBarMenu">
                <h3 className="sideBarTitle"> Quick Menu </h3>
                <ul className="sideBarList">
                    <Link to="/users" className='link'>
                        <li className="sideBarListItem">
                            <Person className="sideBarIcon"/>
                            Users
                        </li>
                    </Link>
                    <Link to="/movies" className='link'>
                        <li className="sideBarListItem">
                            <Movie className="sideBarIcon"/>
                            Movies
                        </li>
                    </Link>
                    
                    {/* <li className="sideBarListItem">
                        <Money className="sideBarIcon"/>
                        Transactions
                    </li>                    */}
                </ul>
            </div>
            {/* <div className="sideBarMenu">
                <h3 className="sideBarTitle"> Notifications </h3>
                <ul className="sideBarList">
                    <li className="sideBarListItem">
                        <AlternateEmail className="sideBarIcon"/>
                        Mail
                    </li> 
                    <li className="sideBarListItem">
                        <Message className="sideBarIcon"/>
                        Messages
                    </li>                    
                </ul>
            </div>
            <div className="sideBarMenu">
                <h3 className="sideBarTitle"> Staff </h3>
                <ul className="sideBarList">
                    <li className="sideBarListItem ">
                        <WorkOutline className="sideBarIcon"/>
                        Managae
                    </li>                   
                </ul>
            </div> */}
        </div>
    </div>
  )
}
