import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable/DataTable";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Invoice = () => {
  const { id } = useParams();
  const [products, setProducts] = useState();
  useEffect(() => {
    const getInvoiceProducts = async () => {
      const docRef = await getDoc(doc(db, "invoices", id));
      setProducts(docRef.data()["invoice-products"]);
      console.log(docRef.data()["invoice-products"]);
    };
    getInvoiceProducts();
  }, []);
  return (
    <>
      <DataTable
        products={products}
        invoice={true}
        tableHeads={[
          "اسم المنتج",
          "سعر المنتج",
          "كميه المنتج",
          "اجمالي سعر المنتج",
        ]}
      />
    </>
  );
};

export default Invoice;
