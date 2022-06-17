import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ placeholder, data }) {
  let [notFoundMovie, setNotFoundMovie] = useState(false);
  let [allData, setAllData] = useState([data]);
  // const [filteredData, setFilteredData] = useState([]);
  let filteredData = [];
  const [wordEntered, setWordEntered] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length === 0) {
      fetch(`http://localhost:8800/api/movies/`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setAllData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = data.filter((value) => {
  //     return value.title.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === "") {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };
  const handleFilter = () => {
    console.log(allData);
    console.log(wordEntered);
    const searchWord = wordEntered;
    // let newFilter = data?.filter((value) => {
    //   return value.title.toLowerCase() === searchWord.toLowerCase();
    //   // console.log(value.title.toLowerCase().includes(searchWord.toLowerCase()));
    //   // return value.title.toLowerCase().includes(searchWord.toLowerCase())
    // });
    let newFilter = allData?.filter((value) => {
      return value.title.toLowerCase() === searchWord.toLowerCase();
      // console.log(value.title.toLowerCase().includes(searchWord.toLowerCase()));
      // return value.title.toLowerCase().includes(searchWord.toLowerCase())
    });
    // let getMovie = fetch(`http://localhost:8800/api/movies/`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((dat) => {
    //     console.log(dat);
    //     setData([dat]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    console.log(newFilter);

    if (newFilter.length === 0) {
      setNotFoundMovie(true);
      navigate(`/searchedMovie/0`);
      // navigate("/products");
      // console.log("Searched");
      // notFoundMovie = true;
      // setFilteredData([]);
    } else if (newFilter.length !== 0) {
      filteredData.push(newFilter);
      console.log(filteredData);
      setNotFoundMovie(false);
      // notFoundMovie = false;

      navigate(`/searchedMovie/${newFilter[0]._id}`);
    }
    console.log(notFoundMovie);
  };

  // const clearInput = () => {
  //   console.log(":cleared");
  //   filteredData=[];
  //   setWordEntered("");
  // };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          // onChange={handleFilter}
          onChange={(e) => {
            setWordEntered(e.target.value);
          }}
        />
        <div className="searchIcon">
          {/* {filteredData.length === 0 ? ( */}

          <button onClick={handleFilter}>
            <SearchIcon></SearchIcon>
          </button>
          {/* ) : ( */}
          {/* <CloseIcon id="clearBtn" onClick={clearInput} /> */}
          {/* )} */}
        </div>
      </div>
      <div>
        <input type="text" placeholder={notFoundMovie.toString()} />
      </div>
      {notFoundMovie && <div> No Movie </div>}
      {/* {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )} */}
    </div>
  );
}

// export default SearchBar;
