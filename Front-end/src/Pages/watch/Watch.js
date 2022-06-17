
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';
import "./Watch.css";
import { Link } from "react-router-dom"

function Watch() {
    const location= useLocation();
    console.log(location)
    const movie= location.state.movie;
    
    console.log(movie)
    console.log(movie.video)
    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                <ArrowBackIcon/>
                    Home
                </div> 
            </Link>
            <iframe className="video" title="Trailer" src={movie.video+"?autoplay=1&mute=1&modestbranding=1&autohide=1&showinfo=0&loop=1&showinfo=0&frameborder=0"}/>
            
            {/* <video className="video"
            autoPlay
            progress
            controls
            src={movie.video}
            ></video> */}
            {/* <iframe className="video" src="https://www.youtube.com/embed/JfVOs4VSpmA" ></iframe> */}
        </div>
    );
}

export default Watch;