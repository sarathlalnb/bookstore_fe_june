import { faUpwork } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faBookSkull,
  faCalendarCheck,
  faDashboard,
  faEllipsis,
  faHome,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div style={{ minHeight: "80vh" }} className="bg-gray-400 h-100">
      <h1 className="text-3xl p-5 text-center font-bold">
        Admin DashBoard <FontAwesomeIcon icon={faDashboard} />{" "}
      </h1>
      <hr />
      <div className="text-center p-15">
        <Link
          to={"/admin-home"}
          className="my-5 text-xl"
          style={{ display: "block" }}
        >
          Home <FontAwesomeIcon icon={faHome} />{" "}
        </Link>
        <hr />
        <Link
          to={"/admin-books"}
          className="my-5 text-xl"
          style={{ display: "block" }}
        >
          All Books/Users <FontAwesomeIcon icon={faBook} />{" "}
        </Link>
        <hr />
        <Link
          to={"/admin-careers"}
          className="my-5 text-xl"
          style={{ display: "block" }}
        >
          Careers <FontAwesomeIcon icon={faCalendarCheck} />{" "}
        </Link>
        <hr />

        <Link
          to={"/admin-applications"} 
          className="my-5 text-xl"
          style={{ display: "block" }}
        >
          View Job Applications <FontAwesomeIcon icon={faCalendarCheck} />
        </Link>
        <hr />

        <Link
          to={"/admin-settings"}
          className="my-5 text-xl"
          style={{ display: "block" }}
        >
          Settings <FontAwesomeIcon icon={faEllipsis} />
        </Link>
        <hr />
      </div>
    </div>
  );
};

export default AdminSideBar;
