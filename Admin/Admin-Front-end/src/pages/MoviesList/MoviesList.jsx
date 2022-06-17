import "./MoviesList.css";
import "../../Components/SearchBar/SearchBar.css";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

export default function MoviesList(props) {
  const [wordEntered, setWordEntered] = useState("");
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState(allData);
  let newFilter;

  const handleFilter = () => {
    if (wordEntered.length === 0) setData(allData);
    else {
      newFilter = allData?.filter((value) => {
        return value.title.toLowerCase().includes(wordEntered.toLowerCase());
      });
      console.log(newFilter);

      if (newFilter.length === 0) {
        setData([]);
      } else if (newFilter.length !== 0) {
        console.log(newFilter);
        setData(newFilter);
      }
      setWordEntered("");
    }
  };

  const ResetFilter = () => {
    setWordEntered("");
    setData(allData);
  };

  useEffect(() => {
    let getMovies = async () => {
      await fetch(`http://localhost:8800/api/Movies`)
        .then((response) => {
          return response.json();
        })
        .then((dat) => {
          setAllData(dat);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(allData);
  }, [allData]);

  const handelDelete = async (id) => {
    await axios
      .delete(`http://localhost:8800/api/delete/${id}`)
      .then((res) => {
        setData();
        setData(data.filter((item) => item._id !== id));
      })
      .catch((e) => console.log(e));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 110 },
    {
      field: "title",
      headerName: "Name",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img src={params.row.imgSm} alt="" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 120 },
    {
      field: "year",
      headerName: "Year",
      width: 100,
    },
    {
      field: "trailer",
      headerName: "Trailer",
      width: 120,
    },
    {
      field: "video",
      headerName: "Movie",
      width: 120,
    },
    {
      field: "img",
      headerName: "Cover",
      width: 120,
    },
    {
      field: "limit",
      headerName: "Age Rating",
      width: 100,
    },
    {
      field: "isSeries",
      headerName: "Serie",
      width: 70,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Movie/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <Delete
              className="productListDelete"
              onClick={() => handelDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movies</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search"
            value={wordEntered}
            onChange={(e) => {
              setWordEntered(e.target.value);
            }}
          />
          <span className="searchIcon">
            <button className="productSearchButton" onClick={handleFilter}>
              <SearchIcon></SearchIcon>
            </button>
          </span>
          <span className="searchIcon">
            <button className="productResetButton" onClick={ResetFilter}>
              <RefreshIcon></RefreshIcon>
            </button>
          </span>
        </div>
        <div></div>
      </div>

      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        checkboxSelection
      />
    </div>
  );
}
