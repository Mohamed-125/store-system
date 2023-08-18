import React, { useEffect, useState } from "react";
import Form from "../components/Form/Form";

import DataTable from "../components/DataTable/DataTable";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";

const HomePage = ({
  getProducts,
  products,
  setProducts,
  modal,
  setModal,
  noQuantity,
}) => {
  const [id, setId] = useState("");
  const [job, setJob] = useState("add");

  const deleteProductHandler = async (id) => {
    const answer = confirm("هل تريد حذف ذلك المنتج ؟ ");
    if (answer) {
      await axios.delete("http://localhost:3000/products/" + id);
      getProducts();
    }
  };

  const schema = yup.object().shape({
    name: yup.string().required("يجب ادخال هذا الحقل"),
    buyPrice: yup
      .number()
      .required("يجب ادخال هذا الحقل ويجب ان يكون رقما")
      .typeError("يجب ادخال هذا الحقل ويجب ان يكون رقما"),

    sellPrice: yup
      .number()
      .required("يجب ادخال هذا الحقل ويجب ان يكون رقما")
      .typeError("يجب ادخال هذا الحقل ويجب ان يكون رقما"),
    quantity: yup
      .number()
      .required("يجب ادخال هذا الحقل ويجب ان يكون رقما")
      .typeError("يجب ادخال هذا الحقل ويجب ان يكون رقما"),
  });

  const onSubmit = async ({ name, sellPrice, buyPrice, quantity }, actions) => {
    if (job === "add") {
      const id = Math.round(Math.random() * 10000000);
      await axios
        .post("http://localhost:3000/products", {
          name,
          sellPrice,
          buyPrice,
          quantity,
          id,
        })
        .then(() => getProducts())
        .catch((err) => console.log(err.response.data));
    } else {
      await axios
        .put("http://localhost:3000/products/" + id, {
          name,
          sellPrice,
          buyPrice,
          quantity,
          id,
        })
        .then(() => getProducts())
        .catch((err) => console.log(err.response.data));
    }
    actions.resetForm();
    setModal(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      sellPrice: "",
      buyPrice: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  return (
    <div>
      <DataTable
        products={
          noQuantity
            ? products.filter((product) => product.quantity === 0)
            : products.filter((product) => product.quantity !== 0)
        }
        setJob={setJob}
        setModal={setModal}
        setId={setId}
        noQuantity={noQuantity}
        setFieldValue={formik.setFieldValue}
        deleteProductHandler={deleteProductHandler}
        tableHeads={[
          "اسم المنتج",
          "سعر بيع المنتج",
          "سعر شراء المنتج",
          "كميه المنتج",
          "أعدادات",
        ]}
      />
      <Form
        setModal={setModal}
        modal={modal}
        id={id}
        onSubmit={onSubmit}
        setProducts={setProducts}
        job={job}
        formik={formik}
        getProducts={getProducts}
      />
    </div>
  );
};

export default HomePage;
