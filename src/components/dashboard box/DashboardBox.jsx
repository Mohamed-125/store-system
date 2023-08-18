import React, { useEffect, useState } from "react";
import "./DashboardBox.scss";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const DashboardBox = ({ title, content, Icon, to, setSearchDate }) => {
  console.log(to);
  return (
    <Link
      to={to}
      className="dashboard-box"
      onClick={() => {
        title === "ارباح اليوم" ? setSearchDate(new Date()) : setSearchDate();
      }}
    >
      <h4 className="flex items-center">
        <Icon />
        {title === "ارباح اليوم"
          ? new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EGP",
            }).format(content)
          : content}
      </h4>
      <p>{title.trim()}</p>
    </Link>
  );
};

export default DashboardBox;
