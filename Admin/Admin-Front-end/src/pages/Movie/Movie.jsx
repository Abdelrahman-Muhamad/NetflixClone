import { Info, Slideshow ,VisibilityOff ,PlaylistPlay } from '@material-ui/icons'
import { CalendarMonth } from '@mui/icons-material'
import { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom' 
import './Movie.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Movie() {
    const [Movie,setMovie]=useState(null);
   
    const [title,setName]=useState("");
    const [desc,setDes]=useState("");
    const [year,setyear]=useState("");
    // const [duration,setDur]=useState("");
    const [imgTitle,setImgTitle]=useState(null);
    const [imgSm,setImgSm]=useState(null);
    const [limit,setlimit]=useState(null);
    const [genre,setgenre]=useState(null);
    const [img,setimg]=useState(null);
    const [video,setvideo]=useState(null);
    const [trailer,setTrailer]=useState(null);
    const [isSeries,setIsSeries]=useState(null);


    let params = useParams();
    const navigate = useNavigate();
    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8800/api/movie/${params.id}`, {title,desc,year,imgTitle,img,imgSm,limit,genre,video,trailer,isSeries})
        .then((res)=>{
            // console.log(res);
            res.data? navigate("/movies") : navigate("/")
        })
        .catch((e)=> console.log(e));
      };
    useEffect(()=>{
        fetch(`http://localhost:8800/api/Movies/${params.id}`)
        .then((response)=>{return response.json()})
        .then((data)=>{
            console.log(data) 
            setMovie(data);
            setName(data.title);
            setDes(data.desc);
            setyear(data.year);
            setImgTitle(data.imgTitle);
            setImgSm(data.imgSm);
            setlimit(data.limit);
            setgenre(data.genre);
            setimg(data.img);
            setvideo(data.video);
            setTrailer(data.trailer);
            setIsSeries(data.isSeries);
        })
        .catch((err)=>{console.log(err)})
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <div className='product'>
        <div className="productTitleContainer">
            <h1 className="productTitle">Movie</h1>
            <Link to="/newMovie">
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productContainer">
        <div className="productShow">
                <div className="productShowTop">
                    <img src={imgSm} alt="" className="productShowImg" />
                    <div className="productShowTopTitle">
                        <span className="productShowName">{title}</span>
                    </div>
                </div><br></br>
                <div className="productShowTop">
                    <img src={imgTitle} alt="" width="300px" height="100px"/>
                    
                </div>
                <div className="productShowBottom">
                <span className="ProductShowTitle">Movie details</span>
               
                    <div className="ProductShowInfo"> 
                        <Info className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">{desc}</span>
                    </div>
                    <div className="ProductShowInfo"> 
                        <VisibilityOff className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">{limit}</span>
                    </div>
                    <div className="ProductShowInfo"> 
                        <CalendarMonth className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">{year}</span>
                    </div>
                    <div className="ProductShowInfo"> 
                        <Slideshow className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">{genre}</span>
                    </div>
                    <div className="ProductShowInfo"> 
                        <PlaylistPlay className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">{isSeries?"Series":"Movie"}</span>
                    </div>
                </div>
            </div>
            <div className="productUpdate">
                <span className="productrUpdateTitle">Edit</span>
                <form className="productUpdateForm">
                    <div className="productUpdateLeft">
                    <div className="productUpdateItem">
                            <label>Small Image</label>
                            <input type="text" value={imgSm} className='productUpdateInput' onChange={(e)=>{setImgSm(e.target.value||Movie.imgSm);}}
                            ></input>
                        </div>
                        <div className="productUpdateItem">
                            <label>Title</label>
                            <input type="text" placeholder={title} className='productUpdateInput' onChange={(e)=>{setName(e.target.value||Movie.title)}}></input>
                        </div>
                        <div className="productUpdateItem">
                            <label>Title Image</label>
                            <input type="text" value={imgTitle} className='productUpdateInput'
                            onBlur={(e) => {
                                if (!e.target.value) {
                                  document.getElementById("nameErrorMsg").style.display = "block";
                                } else {
                                  document.getElementById("nameErrorMsg").style.display = "none";
                                  setImgTitle(e.target.value||Movie.imgTitle)
                                }
                              }}
                              />
                        <p id="nameErrorMsg">Title CANNOT BE LESS THAN 1 CHARACTERS</p>

                        </div>
                        <div className="productUpdateItem">
                            <label>Description</label>
                            <input type="text" placeholder={desc} className='productUpdateInput' 
                            onBlur={(e) => {
                                if (e.target.value.length < 3) {
                                  document.getElementById("descErrorMsg").style.display = "block";
                                  console.log(e.target.value);
                                } else {
                                  document.getElementById("descErrorMsg").style.display = "none";
                                  setDes(e.target.value||Movie.desc)
                                }
                              }} 
                              />
                        <p id="descErrorMsg">DECRIPTION CANNOT BE LESS THAN 3 CHARACTERS</p>

                        </div>
                        <div className="productUpdateItem">
                            <label>Limit</label>
                            <input type="text" placeholder={limit} className='productUpdateInput' onChange={(e)=>{setlimit(e.target.value||Movie.limit)}}></input>
                        </div>
                      
                        <div className="productUpdateItem">
                            <label>Release year</label>
                            <input type="text" placeholder={year} className='productUpdateInput'
                            onBlur={(e) => {
                                if (
                                  e.target.value < 1700 ||
                                  e.target.value > new Date().getFullYear() ||
                                  isNaN(parseInt(e.target.value))
                                ) {
                                  document.getElementById("yearErrorMsg").style.display = "block";
                                  console.log(e.target.value);
                                } else {
                                  document.getElementById("yearErrorMsg").style.display = "none";
                                  setyear(e.target.value||Movie.year)
                                }
                              }}
                              />
                             <p id="yearErrorMsg">ENTER A VALID YEAR</p>

                        </div>
                        <div className="productUpdateItem">
                            <label>Genre</label>
                            <input type="text" placeholder={genre} className='productUpdateInput'
                            onBlur={(e) => {
                                if (isFinite(parseInt(e.target.value))) {
                                  document.getElementById("genreErrorMsg").style.display =
                                    "block";
                                  console.log(e.target.value);
                                } else {
                                  document.getElementById("genreErrorMsg").style.display = "none";
                                  setgenre(e.target.value||Movie.genre)
                                }
                              }}
                            />
                        </div>
                    </div>
                    <div className="productUpdateRight">
                        <div className="productUpdateUpload">
                            <img src={img}
                             alt="" className="productUpdateImg" />
                            {/* <label htmlFor="file"><Publish className='productUpdateIcon'/></label> */}
                            {/* <input type="file" id="file" style={{display:"none"}}></input> */}
                        </div>
                        <div className="productUpdateItem">
                            <label>Movie Image</label>
                            <input type="text" value={img} className='productUpdateInput' onChange={(e)=>{setimg(e.target.value||Movie.img)}}></input>
                        </div>
                        <div className="productUpdateItem">
                            <label>Movie Video</label>
                            <input type="text" value={video} className='productUpdateInput' onChange={(e)=>{setvideo(e.target.value||Movie.video)}}></input>
                        </div>
                        <div className="productUpdateItem">
                            <label>Movie Trailer</label>
                            <input type="text" value={trailer} className='productUpdateInput' onChange={(e)=>{setTrailer(e.target.value||Movie.trailer)}}></input>
                        </div>
                        <div className="productUpdateItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries"  onChange={(e)=>{console.log(e.target.value,isSeries);setIsSeries(e.target.value);console.log(e.target.value,isSeries)} } style={{width:"60px"}}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
                        <button className="productUpdateButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
            {/* <div className="productTopInfo">
                <img src="https://i.pinimg.com/originals/97/bf/27/97bf27becd0df4ff387b882572925416.jpg" alt="" className="productInfoImg" />
                <span className="productInfoName">Captin America:Civil war</span>
            </div> 
            <div className="productshowBottom">
                    <span className="ProductShowTitle">Movie details</span>
                    <div className="ProductShowInfo"> 
                        <Schedule className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">2:16:00</span>
                    </div>
                    <div className="ProductShowInfo"> 
                        <Info className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">During World War II, Steve Rogers, a frail man, 
                        is transformed into the super-soldier Captain America and must stop the Red Skull from using the Tesseract as an energy source for world domination.
                        Captain America: The First Avenger.'</span>
                    </div>
                    <div className="ProductShowInfo"> 
                        <CalendarMonth className='ProductShowIcon'/>
                        <span className="ProductShowInfoTitle">2016</span>
                    </div>
                </div>         */}
        </div> 
    </div>
  )
}
