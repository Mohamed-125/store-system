import React, { useEffect, useState } from "react";
import "./DashboardBox.scss";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const DashboardBox = ({
  title,
  content,
  Icon,
  to,
  setSearchDate,
  searchDate,
}) => {
  // console.log(new Date().getTime());
  const [invoicesNumber, setInvoicesNumber] = useState(0);
  useEffect(() => {
    let invoices;
    const getInvoices = async () => {
      await getDocs(collection(db, "invoices")).then((invoice) => {
        invoices = invoice.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(
          invoices.filter((product) => {
            console.log(new Date(product.date));
            if (new Date(product?.date)?.getTime() === new Date().getTime())
              return product;
          })
        );

        setInvoicesNumber(
          invoices
            .filter(
              (product) =>
                new Date(product?.date)?.getTime() === new Date().getTime()
            )
            .reduce((prev, curr) => {
              return prev + curr["invoice-price"];
            }, 0)
        );
      });
    };
    getInvoices();
  }, []);

  console.log(invoicesNumber);

  return (
    <Link
      to={to}
      className="dashboard-box"
      onClick={() => setSearchDate && setSearchDate(new Date().getTime())}
    >
      <h4 className="flex items-center">
        <Icon />
        {title === "ارباح اليوم"
          ? new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EGP",
            }).format(invoicesNumber)
          : content}
      </h4>
      <p>{title.trim()}</p>
    </Link>
  );
};

export default DashboardBox;
