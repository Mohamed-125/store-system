import { useEffect, useRef, useState } from "react";
import "./Form.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
const Form = ({ modal, setModal, job, formik, setFieldValueFunc }) => {
  const overlayRef = useRef();
  useEffect(() => {
    console.log(modal);
    if (modal) {
      overlayRef.current.style.height = `${
        document.querySelector(".form-main-div").offsetHeight + 60
      }px`;
    }
  }, [modal]);

  const {
    values,
    errors,
    handleBlur,
    isSubmitting,
    touched,
    handleChange,
    handleSubmit,
    setTouched,
    resetForm,
  } = formik;

  const formInputs = [
    {
      title: "الأسم",
      name: "name",
      type: "text",
    },
    {
      title: "سعر البيع",
      name: "sellPrice",
      type: "number",
    },
    {
      title: "سعر الشراء",
      name: "buyPrice",
      type: "number",
    },
    {
      title: "الكميه",
      name: "quantity",
      type: "number",
    },
  ];

  return (
    modal && (
      <>
        <div
          className="form-overlay"
          ref={overlayRef}
          onClick={() => {
            setTouched({}, false);
            setModal(false);
            resetForm();
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
                setTouched({}, false);
                setModal(false);
                resetForm();
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
