import "./NewMovie.css";
import axios from "axios";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function NewMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [imgTit, setImgTit] = useState("");
  const [SmImg, setSmImg] = useState("");
  const [Img, setImg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const AddMovie = async (e) => {
    e.preventDefault();
    if (
      movie.title !== "" &&
      movie.imgTitle != null &&
      movie.imgSm != null &&
      movie.video != null &&
      movie.genre !== "" &&
      movie.img != null &&
      movie.trailer != null &&
      movie.desc !== "" &&
      movie.year !== "" &&
      movie.limit !== 0
    ) {
      console.log("Adding..");
      await axios
        .post("http://localhost:8800/api/AddMovie", movie)
        .then((res) => {
          console.log(movie);
          res && navigate("/movies");
        })
        .catch((e) => console.log(e.target));
    } else {
      console.log("Error in Adding !!!!");
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add Movie</h1>
      <form className="addProductForm" method="Post">
        <div className="newProductItem">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            onBlur={(e) => {
              if (e.target.value.length < 1) {
                document.getElementById("nameErrorMsg").style.display = "block";
              } else {
                document.getElementById("nameErrorMsg").style.display = "none";
                handleChange(e);
              }
            }}
          />
          <p id="nameErrorMsg">Title CANNOT BE LESS THAN 1 CHARACTERS</p>
        </div>
        <div className="newProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter description"
            name="desc"
            onBlur={(e) => {
              if (e.target.value.length < 3) {
                document.getElementById("descErrorMsg").style.display = "block";
                console.log(e.target.value);
              } else {
                document.getElementById("descErrorMsg").style.display = "none";
                handleChange(e);
              }
            }}
          />
          <p id="descErrorMsg">DECRIPTION CANNOT BE LESS THAN 3 CHARACTERS</p>
        </div>
        <div className="newProductItem">
          <label>Release Year</label>
          <input
            type="text"
            placeholder="Enter release Year"
            name="year"
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
                handleChange(e);
              }
            }}
          />
          <p id="yearErrorMsg">ENTER A VALID YEAR</p>
        </div>
        <div className="newProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Enter genre"
            name="genre"
            onBlur={(e) => {
              if (isFinite(parseInt(e.target.value))) {
                document.getElementById("genreErrorMsg").style.display =
                  "block";
                console.log(e.target.value);
              } else {
                document.getElementById("genreErrorMsg").style.display = "none";
                handleChange(e);
              }
            }}
          />
          <p id="genreErrorMsg">GENRE MUST BE A STRING</p>
        </div>
        <div className="newProductItem">
          <label>Limit</label>
          <input
            type="number"
            placeholder="Enter limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="newProductItem">
          <label>Title Image</label>
          <input
            placeholder="Enter URL of Title Image"
            type="text"
            name="imgTitle"
            onChange={(e) => {
              handleChange(e);
              setImgTit(e.target.value);
            }}
            required
          />
          <br></br>
          <div>
            <img src={imgTit} alt="" className="productUpdateImg" />
          </div>
        </div>
        <div className="newProductItem">
          <label>Is Series?</label>
          <select
            name="isSeries"
            id="isSeries"
            onChange={handleChange}
            style={{ width: "60px" }}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="newProductItem">
          <label>Trailer</label>
          <input
            type="text"
            name="trailer"
            placeholder="Enter URL of Trailer"
            onChange={handleChange}
          />
        </div>
        <div className="newProductItem">
          <label>Thumbnail image</label>
          <input
            type="text"
            id="imgSm"
            name="imgSm"
            placeholder="Enter URL of Thumbnail image"
            onChange={(e) => {
              handleChange(e);
              setSmImg(e.target.value);
            }}
            required
          />
          <br></br>
          <div>
            <img src={SmImg} alt="" className="productUpdateImg" />
          </div>
        </div>
        <div className="newProductItem">
          <label>Video</label>
          <input
            type="text"
            name="video"
            placeholder="Enter URL of video"
            onChange={handleChange}
          />
        </div>
        <div className="newProductItem">
          <label>Image</label>
          <input
            type="text"
            id="img"
            name="img"
            placeholder="Enter URL of image"
            onChange={(e) => {
              handleChange(e);
              setImg(e.target.value);
            }}
            required
          />
          <br></br>
          <div>
            <img src={Img} alt="" className="productUpdateImg" />
          </div>
        </div>
        <button className="newProductButton" onClick={AddMovie}>
          <NavLink className="newProductButtonLink" to="/movies">
            Create
          </NavLink>
        </button>
      </form>
    </div>
  );
}
