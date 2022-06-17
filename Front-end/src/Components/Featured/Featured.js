import "./Featured.css"
import React, { useEffect, useState } from 'react';
import { InfoCircle,PlayCircleFill } from 'react-bootstrap-icons'
import {  DropdownButton,Dropdown } from 'react-bootstrap';
import axios from "axios";
import {Link} from 'react-router-dom'

const Featued = ({type,setGenre})=>{
    const [content,setContent] = useState({});
    useEffect(()=>{
        const getRandomContent=async()=>{
          try{
              const res= await axios.get(`/movies/random?type=${type}`, {
                headers: {
                  token:
                  "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                },
              })
              setContent(res.data[0]);
          }
          catch(err){
            console.log(err)
          }
        }
        getRandomContent();
    },[type])
    return(
        <div className="featued"> 
        {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>

          {/* Genre list picked according to the page you are in */}

          <DropdownButton id="dropdown-button-dark-example2" variant="secondary" menuVariant="dark"
          title="Genre" className="mt-2 genre" name="genre" onChange={e=>setGenre(e.target.value)}>
            <Dropdown.Item value="adventure">Adventure</Dropdown.Item>
            <Dropdown.Item value="comedy">Comedy</Dropdown.Item>
            <Dropdown.Item value="crime">Crime</Dropdown.Item>
            <Dropdown.Item value="fantasy">Fantasy</Dropdown.Item>
            <Dropdown.Item value="historical">Historical</Dropdown.Item>
            <Dropdown.Item value="horror">Horror</Dropdown.Item>
            <Dropdown.Item value="romance">Romance</Dropdown.Item>
            <Dropdown.Item value="sci-fi">Sci-fi</Dropdown.Item>
            <Dropdown.Item value="thriller">Thriller</Dropdown.Item>
            <Dropdown.Item value="western">Western</Dropdown.Item>
            <Dropdown.Item value="animation">Animation</Dropdown.Item>
            <Dropdown.Item value="drama">Drama</Dropdown.Item>
            <Dropdown.Item value="documentary">Documentary</Dropdown.Item>
            </DropdownButton>
          
        </div>
      )}



            {/*Feature back ground "Afesh el film"  */}

            {/* <img  src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" */}
            {/* /> */}
            <img 
            src={content.img}
            alt=""/>

            <div className="info">
 
              {/*information image "Esm el film"  */}

              {/* <img
                src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
                alt=""
              /> */}
              <img 
               src={content.imgTitle}
                alt=""/>
 
              <span className="Discription">
              {content.desc}
              </span>


              {/* Controlling your movie  */}

              <div className="Buttons">
              <Link to ={"/watch"} state = {{movie:content}} className="text-decoration-none">
                <button className="play">
                  <PlayCircleFill/>
                  <span>Play</span>
                </button>
              </Link>
              <button className="more">
                <InfoCircle/>
                <span>More</span>
              </button>
              
              </div>
              
            </div>
        </div>
           

    )
}
export default Featued;