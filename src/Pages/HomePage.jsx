import React, { useEffect, useState } from "react";
import Form from "../components/Form/Form";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import DataTable from "../components/DataTable/DataTable";
import { useFormik } from "formik";
import * as yup from "yup";

const HomePage = ({ getProducts, products, setProducts }) => {
  // const [productName, setProductName] = useState("");
  // const [productPrice, setProductPrice] = useState();
  // const [productQuantity, setProductQuantity] = useState();
  const [id, setId] = useState("");
  const [job, setJob] = useState("add");
  const [modal, setModal] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("يجب ادخال هذا الحقل"),
    price: yup
      .number()
      .required("يجب ادخال هذا الحقل ويجب ان يكون رقما")
      .typeError("يجب ادخال هذا الحقل ويجب ان يكون رقما"),
    quantity: yup
      .number()
      .required("يجب ادخال هذا الحقل ويجب ان يكون رقما")
      .typeError("يجب ادخال هذا الحقل ويجب ان يكون رقما"),
  });

  const onSubmit = async ({ name, price, quantity }, actions) => {
    if (job === "add") {
      const docRef = await addDoc(collection(db, "products"), {
        name,
        price,
        quantity,
      });
    } else {
      const updateRef = await updateDoc(doc(db, "products", id), {
        name,
        price,
        quantity,
      });
    }
    actions.resetForm();
    getProducts();
    setModal(false);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      price: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  const deleteProductHandler = async (id) => {
    const answer = confirm("هل تريد حذف ذلك المنتج ؟ ");
    if (answer) {
      await deleteDoc(doc(db, "products", id));
      getProducts();
    }
  };

  useEffect(() => {
    console.log(job);
  }, [job]);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <DataTable
        products={products}
        setJob={setJob}
        setModal={setModal}
        setId={setId}
        setFieldValue={formik.setFieldValue}
        deleteProductHandler={deleteProductHandler}
        tableHeads={["اسم المنتج", "سعر المنتج", "كميه المنتج", "أعدادات"]}
      />
      <Form
        setModal={setModal}
        modal={modal}
        formik={formik}
        job={job}
        formInputs={[
          {
            title: "الأسم",
            name: "name",
            type: "text",
          },
          {
            title: "السعر",
            name: "price",
            type: "number",
          },
          {
            title: "الكميه",
            name: "quantity",
            type: "number",
          },
        ]}
      />
    </div>
  );
};

export default HomePage;
