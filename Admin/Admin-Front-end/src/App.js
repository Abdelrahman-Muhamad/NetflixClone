import Topbar from "./Components/topbar/Topbar";
import Sidebar from "./Components/sidebar/Sidebar";
import './App.css'
import Home from "./pages/Home/Home";
import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom'
import Userlist from "./pages/userList/Userlist";
import User from "./pages/USER/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/MoviesList/MoviesList";
import Movie from "./pages/Movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Error from "./pages/Error/Error";


function App() {
  return (
    <Router>
      <Topbar/> 
      <div className="container">
        <Sidebar/>
        <Routes>
          <Route exact={true} path="/" element={<Home/>}/>
          <Route path="/users" element={<Userlist/>}/>  
          <Route path="/user/:id" element={<User/>}/>  
          <Route path="/newUser" element={<NewUser/>}/>  
          <Route path="/Movies" element={<MovieList/>}/>  
          <Route path="/Movie/:id" element={<Movie/>}/>  
          <Route path="/NewMovie" element={<NewMovie/>}/>  
          <Route path="*" element={<Error/>}/>  
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
