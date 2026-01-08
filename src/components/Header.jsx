import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignOut, faUserEdit, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { removeToken, token } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogoutClick = () => {
    removeToken();
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <img
          className="w-20"
          src="https://cdn-icons-png.flaticon.com/128/8017/8017848.png"
          alt=""
        />
        <h1 className="text-center font-bold text-3xl">BOOK STORE</h1>
        <div className="me-4 flex items-center">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faFacebookF} />

          {token ? (
            <Dropdown
              label={
                <div>
                  <img
                    className="w-10"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanlasPgQjfGGU6anray6qKVVH-ZlTqmuTHw&s"
                    alt=""
                  />
                </div>
              }
              dismissOnClick={false}
            >
              <div className="bg-white ">
                <DropdownItem className=" text-md ps-2">
                  {" "}
                  <Link to={"/Profile"}>
                    Profile <FontAwesomeIcon icon={faUserEdit} />{" "}
                  </Link>
                </DropdownItem>
                <DropdownItem className="text-md ps-2">
                  <button onClick={onLogoutClick}>
                    Logout <FontAwesomeIcon icon={faSignOut} />
                  </button>
                </DropdownItem>
              </div>
            </Dropdown>
          ) : (
            <Link to="/login">
              <button className="border-2 p-3 font-bold hover:bg-black hover:text-white rounded-2xl">
                <FontAwesomeIcon icon={faUser} />
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <nav className="p-3 w-full bg-gray-900 text-white flex justify-center items-center">
          <div className="flex gap-10 text-lg font-semibold">
            <Link to={"/"}>
              <button>Home</button>
            </Link>
            <Link to="/allBooks">
              <button>Book</button>
            </Link>
            <Link to={"/careers"}>
              <button>Career</button>
            </Link>

            <button>Contact</button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
