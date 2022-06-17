import { Mail, Person, PhoneAndroid } from "@material-ui/icons";
import PasswordIcon from "@mui/icons-material/Password";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  const [User, setUser] = useState({});

  const [username, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [profilePic, setPic] = useState(null);
  const [isAdmin, setisAdmin] = useState(null);

  let params = useParams();
  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8800/api/User/User/${params.id}`, {
        username,
        fullname,
        phone,
        email,
        password,
        profilePic,
        isAdmin,
      })
      .then((res) => {
        res.data ? navigate("/users") : navigate("/");
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetch(`http://localhost:8800/api/User/Users/${params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
        setName(data.username);
        setFullname(data.fullname);
        setphone(data.phone);
        setEmail(data.email);
        setPass(data.password);
        setisAdmin(data.isAdmin);
        setPic(data.profilePic);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={profilePic} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUserName">{fullname}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account details</span>
            <div className="userShowInfo">
              <Person className="userShowIcon" />
              <span className="userShowInfoTitle">{username}</span>
            </div>

            <div className="userShowInfo">
              <Mail className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
            <div className="userShowInfo">
              <PasswordIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{password}</span>
            </div>
            <div className="userShowInfo">
              <SupervisorAccountIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>fullname</label>
                <input
                  type="text"
                  placeholder={fullname}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setFullname(e.target.value || User.fullname);
                  }}
                  onBlur={(e) => {
                    if (isFinite(e.target.value)) {
                      document.getElementById("nameErrorMsg").style.display =
                        "block";
                    } else {
                      document.getElementById("nameErrorMsg").style.display =
                        "none";
                      setFullname(e.target.value);
                    }
                    console.log(parseInt(e.target.value));
                  }}
                ></input>
                <p id="nameErrorMsg">FULLNAME MUST BE STRING</p>
              </div>

              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={username}
                  className="userUpdateInput"
                  onBlur={(e) => {
                    if (e.target.value.length < 3) {
                      document.getElementById("usrErrorMsg").style.display =
                        "block";
                    } else {
                      document.getElementById("usrErrorMsg").style.display =
                        "none";
                      setName(e.target.value);
                    }
                  }}
                  onChange={(e) => {
                    setName(e.target.value || User.username);
                  }}
                ></input>
                <p id="usrErrorMsg">
                  USERNAME CANNOT BE LESS THAN 3 CHARACTERS
                </p>
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={email}
                  className="userUpdateInput"
                  onBlur={(e) => {
                    if (!e.target.value.match(mailformat)) {
                      document.getElementById("mailErrorMsg").style.display =
                        "block";
                    } else {
                      document.getElementById("mailErrorMsg").style.display =
                        "none";
                      setEmail(e.target.value);
                    }
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value || User.email);
                  }}
                ></input>
                <p id="mailErrorMsg">ENTER A VALID E-MAIL</p>
              </div>
              <div className="userUpdateItem">
                <label>Phone number</label>
                <input
                  type="text"
                  placeholder={phone}
                  className="userUpdateInput"
                  onBlur={(e) => {
                    if (isNaN(parseInt(e.target.value))) {
                      document.getElementById("numberErrorMsg").style.display =
                        "block";
                    } else {
                      document.getElementById("numberErrorMsg").style.display =
                        "none";
                      setphone(e.target.value);
                    }
                  }}
                  onChange={(e) => {
                    setphone(e.target.value || User.phone);
                  }}
                ></input>
                <p id="numberErrorMsg">ENTER A VALID NUMBER</p>
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder={password}
                  className="userUpdateInput"
                  onChange={(e) => {
                    if (e.target.value.length < 8) {
                      document.getElementById("passErrorMsg").style.display =
                        "block";
                    } else {
                      document.getElementById("passErrorMsg").style.display =
                        "none";
                      setPass(e.target.value || User.password);
                    }
                  }}
                ></input>
                <p id="passErrorMsg">PASSWORD MUST BE MORE THAN 8 CHARACTERS</p>
              </div>
              <div className="userUpdateItem">
                <label>Confirm Password</label>
                <input
                  type="password"
                  laceholder={password}
                  className="userUpdateInput"
                  onChange={(e) => {
                    if (e.target.value !== password) {
                      document.getElementById("confirmErrorMsg").style.display =
                        "block";
                    } else {
                      document.getElementById("confirmErrorMsg").style.display =
                        "none";
                    }
                  }}
                />
                <p id="confirmErrorMsg">PASSWORD DOESN'T MATCH </p>
              </div>
              <div id="isAdminDiv" className="userUpdateItem">
                <label>Is Admin?</label>
                <input
                  id="isAdminLbl"
                  required
                  type="radio"
                  name="isAdmin"
                  value="Yes"
                  onBlur={(e) => {
                    if (e.target.checked) {
                      setisAdmin(true);
                    }
                  }}
                />
                <label id="isAdminLbl">Yes</label>
                <input
                  id="isAdminLbl"
                  required
                  type="radio"
                  name="isAdmin"
                  value="No"
                  onBlur={(e) => {
                    if (e.target.checked) {
                      setisAdmin(false);
                    }
                  }}
                />
                <label id="isAdminLbl">No</label>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img src={profilePic} alt="" className="userUpdateImg" />
              </div>
              <div className="userUpdateItem">
                <label>Profile Picture</label>
                <input
                  type="text"
                  placeholder={profilePic}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setPic(e.target.value || User.profilePic);
                  }}
                ></input>
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>
                <Link to="/users">Update</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
