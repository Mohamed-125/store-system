import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";

const Invoices = ({ setSearchDate, searchDate, invoices, setInvoices }) => {
  const getInvoices = async () => {
    await axios
      .get("http://localhost:3000/invoices")
      .then((invoices) => {
        setInvoices(invoices.data.reverse());
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div>
      {/* <h1 className="text-center">Invoice</h1> */}
      <DataTable
        products={invoices}
        setSearchDate={setSearchDate}
        searchDate={searchDate}
        invoices={true}
        tableHeads={["رقم الفاتوره", "تاريخ الفاتوره", "سعر الفاتوره"]}
      />
    </div>
  );
};

export default Invoices;
