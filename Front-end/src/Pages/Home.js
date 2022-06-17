import {React,useEffect,useState} from 'react'
import './Home.css'
import NavBar from '../Components/NavBar/NavBar'
import Featued from '../Components/Featured/Featured'
import  List from '../Components/List/List'
import axios from 'axios'


const Home =({type})=>{

    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
  
    useEffect(() => {
      const getRandomLists = async () => {
        try {
          const res = await axios.get(
            `lists${type ? "?type=" + type : ""}${
              genre ? "&genre=" + genre : ""
            }`,
            {
              headers: {
                token:
                "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
              },
            }
          );
          console.log(res);
          setLists(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getRandomLists();
    }, [type, genre]);
return(
    <div className='home'>
        <NavBar/>
       <Featued type={type} setGenre={setGenre}/>
       {lists.map((list,i) => (
        <List key={i} list={list} />
      ))}
       {/* <List/>
       <List/>
       <List/>
       <List/> */}
 
       {/* <img  src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            /> */}
      
    </div>
)
}
export default Home;