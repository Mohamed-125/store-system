import { useState } from "react";
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
  noQuntity = false,
  setId,
  tableHeads,
  setFieldValue,
  print = false,
  searchDate,
  setSearchDate,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(print ? 50 : 5);
  const [startIndex, setStartIndex] = useState(1);
  const [firstOrlast, setFirstOrLast] = useState("first");
  const [searchWord, setSearchWord] = useState("");
<<<<<<< HEAD

  let visibleRows;

  console.log();

  let filteredProducts = products
    .filter((product) => {
      if (product.name) {
        return product.name.toLowerCase().includes(searchWord.toLowerCase());
      } else if (product["invoice-number"]) {
        if (
          String(product["invoice-number"])
            .toLowerCase()
            .includes(searchWord.toLowerCase())
        ) {
          return product;
        }
      }
    })
    .filter((product) => {
      if (product?.date && searchDate) {
        console.log(product?.date);
        if (new Date(product?.date)?.getTime() === searchDate) {
          return product;
        }
      } else {
        return product;
      }
    });

  visibleRows = filteredProducts?.sort(function (a, b) {
    if (firstOrlast === "first") {
      return a?.name?.localeCompare(b.name, ["ar"]);
    } else {
      return b?.name?.localeCompare(a.name, ["ar"]);
    }
  });

  visibleRows = visibleRows?.slice(startIndex - 1, rowsPerPage * page);
=======
  // console.log(products);
  // console.log(products.id);

  const visibleRows = invoices
    ? products
      : products
        ?.filter((product) => {
          return product.name.toLowerCase().includes(searchWord.toLowerCase())
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
>>>>>>> 3b26041824add50e36cd5751d0eef7179338365e

  return (
    <div className="pl-[20px] table-table">
      <div className="container !p-0 flex flex-row-reverse justify-between items-center mt-[20px]">
        <h3 className="text-3xl">
          {print
            ? "الفاتوره"
            : invoice
            ? "منتجات الفاتوره"
            : invoices
            ? "الفواتير"
            : "المنتجات"}
        </h3>
        {print || invoice || invoices || noQuntity ? null : (
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
      <div className="container flex items-center gap-3 mt-5 justify-between flex-row-reverse !p-0">
        <div className="flex gap-3 items-center flex-1 flex-row-reverse  justify-start ">
          <h2 className="text-end text-xl font-bold">ابحث عن منتج</h2>
          {invoices ? (
            <>
              <input
                type="number"
                className="p-[3px] text-right px-5 w-full max-w-[240px] "
                placeholder="اكتب رقم الفاتوره للبحث"
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
              />
              <input
                type="date"
                className="p-[3px] text-right px-5 w-full max-w-[240px] "
                value={
                  searchDate
                    ? new Date(searchDate).toISOString().slice(0, 10)
                    : ""
                }
                onChange={(e) => {
                  setSearchDate(
                    new Date(e.target.value).getTime()
                      ? new Date(e.target.value).getTime()
                      : ""
                  );
                }}
              />
            </>
          ) : (
            <input
              type="text"
              style={{ direction: "rtl" }}
              className="p-[3px] text-right px-5 w-full max-w-[240px] "
              placeholder="اكتب اسم المنتج للبحث"
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
          )}
        </div>

        <h2 className="text-xl font-bold text-right">
          {filteredProducts.length} : عدد المنتجات{" "}
        </h2>
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
<<<<<<< HEAD
            {filteredProducts?.length > 0 ? (
              visibleRows.map((product) => {
                return invoices ? (
                  <tr
                    key={product.id}
                    className="cursor-pointer flex hover:opacity-90 hover:bg-slate-100"
                  >
                    <div className="flex flex-1">
                      <Link className="flex flex-1" to={`${product.id}`}>
                        <td>{product["invoice-number"]}</td>
                        <td
                          style={{
                            direction: "rtl",
                            justifyContent: "start",
                          }}
                        >
                          {product["invoice-date"]}
                        </td>
                        <td>{product["invoice-price"]} ج.م</td>
                      </Link>
                    </div>
                  </tr>
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
=======
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
>>>>>>> 3b26041824add50e36cd5751d0eef7179338365e
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
<<<<<<< HEAD
            ) : (
              <h3 className="py-9 font-bold text-xl text-center">
                {invoices
                  ? "لا يوجد اي منتجات حاول تغير التاريخ او كلمه البحث او اضافه منتجات"
                  : "لا يوجد اي منتجات"}
              </h3>
            )}
=======
              : "لا يوجد اي منتجات"}
>>>>>>> 3b26041824add50e36cd5751d0eef7179338365e

            {products?.length === 0 && (
              <tr className="text-3xl text-gray-400 text-center !justify-center  font-bold py-10">
                <td className=" !justify-center">لا توجد منتجات</td>
              </tr>
            )}
          </tbody>
        </table>
<<<<<<< HEAD

        {print ? null : filteredProducts.length > 5 ? (
=======
        {print || invoices ? null : products?.filter((product) =>
          product.name.toLowerCase().includes(searchWord.toLowerCase())
        ).length > 5 ? (
>>>>>>> 3b26041824add50e36cd5751d0eef7179338365e
          <TablePagination
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            setStartIndex={setStartIndex}
            products={products}
            searchWord={searchWord}
          />
        ) : null}
<<<<<<< HEAD
=======
        {/* {console.log(products)} */}
>>>>>>> 3b26041824add50e36cd5751d0eef7179338365e
      </div>
    </div>
  );
}
