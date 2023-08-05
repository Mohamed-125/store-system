import { useEffect, useState } from "react";
import "./dataTable.scss";
import Typography from "@mui/material/Typography";
import TablePagination from "./TablePagination";
// import DeleteIcon from "@mui/icons-material/Delete";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export default function DataTable({
  invoices = false,
  invoice = false,
  products,
  setModal,
  deleteProductHandler,
  setJob,
  setProducts,
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
  const [firstOrlast, setFirstOrLast] = useState("first");
  const [searchWord, setSearchWord] = useState("");
  
  // console.log(products.id);

  const visibleRows = products
    ?.filter((product) =>{
      product.name.toLowerCase().includes(searchWord.toLowerCase())
    }
    )
    ?.sort(function (a, b) {
      if (firstOrlast === "first") {
        return a.name.localeCompare(b.name, ["ar"]);
      } else {
        return b.name.localeCompare(a.name, ["ar"]);
      }
    })
    ?.slice(startIndex - 1, rowsPerPage * page);

  return (
    <>
      <div className="container !p-0 flex flex-row-reverse justify-between items-center mt-[20px]">
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h4"
          id="tableTitle"
          component="div"
          className="text-end"
        >
          {!print ? "المنتجات" : "الفاتوره"}{" "}
        </Typography>

        {print || invoice || invoices ? null : (
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
      <div className="container flex flex-col gap-3 mt-5 items-end !p-0">
        <h2 className="text-end text-xl mt-5 font-bold">ابحث عن منتج</h2>
        <input
          type="text"
          style={{ direction: "rtl" }}
          className="mt-2 mb-5 p-2 text-right px-5 w-full max-w-md min-w-[280px] "
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
      </div>
      <div className="table-container container">
        <table>
          <thead>
            <tr>
              {tableHeads.map((head, n) => {
                return (
                  <th
                    key={n}
                    onClick={() => {
                      if (head === "اسم المنتج") {
                        setFirstOrLast((pre) => {
                          if (pre === "first") {
                            return "last";
                          } else {
                            return "first";
                          }
                        });
                      }
                    }}
                    style={{ gap: "10px", cursor: "pointer" }}
                  >
                    {head === "اسم المنتج" ? (
                      firstOrlast === "first" ? (
                        <AiOutlineArrowUp />
                      ) : (
                        <AiOutlineArrowDown />
                      )
                    ) : null}

                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {products?.length > 0
              ? visibleRows.map((product) => {
                  return invoices ? (
                    <Link to={`${product.id}`} key={product.id}>
                      <tr className="cursor-pointer hover:opacity-90 hover:bg-slate-100">
                        <td>{product["invoice-number"]}</td>
                        <td
                          style={{ direction: "rtl", justifyContent: "start" }}
                        >
                          {product["invoice-date"]}
                        </td>
                        <td>{product["invoice-price"]} ج.م</td>
                      </tr>
                    </Link>
                  ) : (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td className="flex-row-reverse gap-1">
                        {product.price} <p>ج.م </p>
                      </td>
                      {print || invoice ? (
                        <td>{product.selectedQuantity}</td>
                      ) : null}
                      {invoice ? null : <td>{product.quantity}</td>}
                      {invoice ? (
                        <td className="flex-row-reverse gap-1">
                          {product.price * product.selectedQuantity} <p>ج.م </p>
                        </td>
                      ) : null}

                      {print || invoice ? null : (
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
              : "لا يوجد اي منتجات"}

            {products?.length === 0 && (
              <tr className="text-3xl text-gray-400 text-center !justify-center  font-bold py-10">
                <td className=" !justify-center">لا توجد منتجات</td>
              </tr>
            )}
          </tbody>
        </table>
        {!print &&
        products?.filter((product) =>
          product.name.toLowerCase().includes(searchWord.toLowerCase())
        ).length > 5 ? (
          <TablePagination
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            setStartIndex={setStartIndex}
            products={products}
            searchWord={searchWord}
          />
        ) : null}
      </div>
      {invoice && (
        <p className="container text-2xl text-end font-bold px-0">
          اجمالي سعر الفاتوره :{" "}
          {products.reduce((prev, curr) => {
            return prev + curr.price * Number(curr.selectedQuantity);
          }, 0)}{" "}
          ج.م
        </p>
      )}
    </>
  );
}
