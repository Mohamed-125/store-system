import React, { useEffect, useState } from "react";
import "./dataTable.scss";
import Typography from "@mui/material/Typography";
import TablePagination from "./TablePagination";
// import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useFormik } from "formik";

export default function DataTable({
  invoice = false,
  products,
  setModal,
  deleteProductHandler,
  setJob,
  setId,
  tableHeads,
  setFieldValue,
  print = false,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(print ? 50 : 5);
  const [startIndex, setStartIndex] = useState(1);
  const visibleRows = products.slice(startIndex - 1, rowsPerPage * page);

  return (
    <>
      <div className="container !p-0 flex justify-between items-center mt-[20px]">
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          {!print ? "المنتجات" : "الفاتوره"}{" "}
        </Typography>

        {!print && (
          <button
            className="btn max-w-[120px]"
            onClick={() => {
              setJob("add");
              setModal(true);
            }}
          >
            اضافه منتج
          </button>
        )}
      </div>
      <div className="table-container container">
        <table>
          <thead>
            <tr>
              {tableHeads.map((head, n) => {
                return <th key={n}>{head}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {products.length > 0
              ? visibleRows.map((product) => {
                  return invoice ? (
                    <tr key={product.id}>
                      <td>{product["invoice-number"]}</td>
                      <td style={{ direction: "rtl", justifyContent: "start" }}>
                        {product["invoice-date"]}
                      </td>
                      <td>{product["invoice-price"]} ج.م</td>
                    </tr>
                  ) : (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      {print && <td>{product.selectedQuantity}</td>}
                      <td>{product.quantity}</td>
                      {!print && (
                        <td>
                          <button
                            onClick={() => {
                              setJob("تعديل");
                              setModal(true);
                              setFieldValue("name", product.name);
                              setFieldValue("price", product.price);
                              setFieldValue("quantity", product.quantity);
                              setId(product.id);
                            }}
                            title="تعديل المنتج"
                          >
                            <AiFillEdit />
                          </button>

                          <button
                            title="حذف المنتج"
                            onClick={() => deleteProductHandler(product.id)}
                          >
                            <AiFillDelete />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              : null}

            {products.length === 0 && (
              <tr className="text-3xl text-gray-400 text-center !justify-center  font-bold py-10">
                <td className=" !justify-center">لا توجد منتجات</td>
              </tr>
            )}
          </tbody>
        </table>
        {!print && products.length > 5 ? (
          <TablePagination
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            setStartIndex={setStartIndex}
            products={products}
          />
        ) : null}
      </div>
    </>
  );
}
