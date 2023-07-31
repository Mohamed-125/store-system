import { useEffect, useRef, useState } from "react";
import "./Form.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { db } from "../../firebase";

import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
const Form = ({ formInputs, formik, modal, setModal, job }) => {
  const overlayRef = useRef();

  useEffect(() => {
    if (modal) {
      overlayRef.current.style.height = `${
        document.querySelector(".form-main-div").offsetHeight + 60
      }px`;
      console.log(job);
    }
  }, [modal]);

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
  };
  const {
    values,
    errors,
    handleBlur,
    isSubmitting,
    touched,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    modal && (
      <>
        <div
          className="form-overlay"
          ref={overlayRef}
          onClick={() => {
            setModal(false);
          }}
        ></div>
        <form onSubmit={handleSubmit} className="form-main-div container">
          <h2 className="text-2xl text-gray-800 text-end mb-6 font-bold">
            {job === "add" ? "اضافه منتج " : "تعديل المنتج"}{" "}
          </h2>{" "}
          {formInputs.map((formInput, i) => {
            return (
              <div className="input-div" key={i}>
                {formInput.state}

                <label>{formInput.title}</label>
                <input
                  value={values[formInput.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={formInput.name}
                  type={formInput.type}
                />

                <p>
                  {errors[formInput.name] && touched[formInput.name]
                    ? errors[formInput.name]
                    : null}
                </p>
              </div>
            );
          })}
          <div className="flex gap-4 flex-row-reverse dir mt-4 ">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn addOrEditBtn"
            >
              {job === "add" ? "اضافه" : "تعديل"}
            </button>

            <button
              className="error-btn"
              type="button"
              onClick={(e) => {
                // resetValues();
                setModal(false);
              }}
            >
              الغاء
            </button>
          </div>
        </form>
      </>
    )
  );
};

export default Form;
