import "./userlist.css";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

export default function Userlist() {
  const [wordEntered, setWordEntered] = useState("");
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState(allData);
  let newFilter;

  const handleFilter = () => {
    console.log(data);
    console.log(allData);
    console.log(wordEntered);
    if (wordEntered.length === 0) setData(allData);
    else {
      newFilter = allData?.filter((value) => {
        return value.username.toLowerCase().includes(wordEntered.toLowerCase());
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
    let getUsers = async () => {
      await fetch(`http://localhost:8800/api/User/Users`)
        .then((response) => {
          return response.json();
        })
        .then((dat) => {
          console.log(dat);
          setAllData(dat);
          console.log(data);
          console.log(allData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(allData);
  }, [allData]);

  const handelDelete = async (id) => {
    await axios
      .delete(`http://localhost:8800/api/User/delete/${id}`)
      .then((res) => {
        setData(data.filter((item) => item._id !== id));
      })
      .catch((e) => console.log(e));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img src={params.row.profilePic} alt="" className="userListImg" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
    },
    {
      field: "password",
      headerName: "Password",
      width: 120,
    },

    {
      field: "isAdmin",
      headerName: "Admin/User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.isAdmin ? "Admin" : "User"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <Delete
              className="userListDelete"
              onClick={() => {
                handelDelete(params.row._id);
                console.log(params.row._id);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        <div className="productTitleContainer">
          <h1 className="productTitle">Users</h1>
          <Link to="/newUser">
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
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          checkboxSelection
        />
      </div>
    </>
  );
}
