import React, { useEffect, useState } from "react";
import Form from "../components/Form/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

const HomePage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [job, setJob] = useState("add");
  const [modal, setModal] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("يجب ادخال هذا الحقل"),
    price: yup
      .number()
      .required("يجب ادخال هذاالحقل ويجب ان يكون رقما")
      .typeError("يجب ادخال هذاالحقل ويجب ان يكون رقما"),
    quantity: yup
      .number()
      .required("يجب ادخال هذاالحقل ويجب ان يكون رقما")
      .typeError("يجب ادخال هذاالحقل ويجب ان يكون رقما"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const getProducts = async () => {
    await getDocs(collection(db, "products")).then((product) => {
      const products = product.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(products);
      console.log(products);
    });
  };

  const addProduct = async (data) => {
    console.log({ data });

    const docRef = await addDoc(collection(db, "products"), {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    });
    getProducts();
    reset();
    setModal(false);
  };

  const updataProudct = async (data) => {
    console.log("update");
    const updataDoc = await updateDoc(doc(db, "products", id), {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    });
    getProducts();
    reset();
    setModal(false);
  };

  const deleteProductHandler = async (id) => {
    const answer = confirm("هل تريد حذف ذلك المنتج ؟ ");
    if (answer) {
      await deleteDoc(doc(db, "products", id));
      getProducts();
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <DataTable
        products={products}
        job={job}
        setJob={setJob}
        setModal={setModal}
        setProductName={setProductName}
        setProductPrice={setProductPrice}
        setId={setId}
        deleteProductHandler={deleteProductHandler}
        setProductQuantity={setProductQuantity}
      />
      <Form
        setModal={setModal}
        modal={modal}
        handleSubmit={
          job === "add" ? handleSubmit(addProduct) : handleSubmit(updataProudct)
        }
        job={job}
        register={register}
        errors={errors}
        formInputs={[
          {
            title: "الأسم",
            name: "name",
            required: true,
            state: productName,
            setState: setProductName,
            type: "text",
          },
          {
            title: "السعر",
            name: "price",
            required: true,
            state: productPrice,
            setState: setProductPrice,
            type: "number",
          },
          {
            title: "الكميه",
            name: "quantity",
            required: true,
            state: productQuantity,
            setState: setProductQuantity,
            type: "number",
          },
        ]}
      />
    </div>
  );
};

export default HomePage;
