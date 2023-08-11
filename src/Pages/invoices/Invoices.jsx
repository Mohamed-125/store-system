import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Invoices = ({ setSearchDate, searchDate }) => {
  const [invoices, setInvoices] = useState([]);
  const getInvoices = async () => {
    await getDocs(collection(db, "invoices")).then((invoice) => {
      const invoices = invoice.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setInvoices(invoices);
    });
  };
  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div>
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