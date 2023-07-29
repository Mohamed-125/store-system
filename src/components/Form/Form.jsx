import { useEffect, useRef, useState } from "react";
import "./Form.scss";

const Form = ({
  formInputs,
  handleSubmit,
  register,
  errors,
  modal,
  setModal,
  job,
}) => {
  const overlayRef = useRef();

  useEffect(() => {
    if (modal) {
      overlayRef.current.style.height = `${
        document.querySelector(".form-main-div").offsetHeight + 60
      }px`;
    }
  }, [modal]);

  return (
    modal && (
      <>
        <div
          className="form-overlay"
          ref={overlayRef}
          onClick={() => {
            setModal(false);
          }}
        ></div>{" "}
        <form onSubmit={handleSubmit} className="form-main-div container">
          {formInputs.map((formInput) => {
            return (
              <div className="input-div" key={formInput.name}>
                <label>{formInput.title}</label>
                <input
                  {...register(formInput.name)}
                  // type={formInput.type}
                  onChange={(e) => formInput.setState(e.target.value)}
                  value={formInput.state}
                  // required={formInput.required}
                />
                <p>{errors[formInput.name]?.message}</p>
              </div>
            );
          })}
          <div className="flex gap-4 flex-row-reverse dir mt-1 ">
            <button className="btn">{job === "add" ? "اضافه" : "تعديل"}</button>
            <button
              className="error-btn"
              onClick={() => {
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
