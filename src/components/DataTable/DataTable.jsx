import React, { useState } from "react";
import "./dataTable.scss";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { visuallyHidden } from "@mui/utils";

export default function DataTable({
  products,
  setModal,
  deleteProductHandler,
  setJob,
  setProductName,
  setProductPrice,
  setProductQuantity,
  setId,
  tableHeads,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(1);
  const visibleRows = products.slice(startIndex - 1, rowsPerPage * page + 1);

  // function createData(name, price, quantity, id, protein) {
  //   return {
  //     name,
  //     price,
  //     quantity,
  //     id,
  //     protein,
  //   };
  // }

  // const rows = products.map((product) => {
  //   return createData(
  //     product.name,
  //     product.price,
  //     product.quantity,
  //     product.id
  //   );
  // });

  // const headCells = [
  //   {
  //     id: "name",
  //     numeric: false,
  //     disablePadding: false,
  //     label: "اسم المنتج",
  //   },
  //   {
  //     id: "price",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "سعر المنتج",
  //   },
  //   {
  //     id: "Quaquantity (g)",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "كميه المنتج",
  //   },
  //   {
  //     id: "Protien (g)",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "ID",
  //   },
  //   {
  //     id: "options",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "اعدادت",
  //   },
  // ];

  // function descendingComparator(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // function getComparator(order, orderBy) {
  //   return order === "desc"
  //     ? (a, b) => descendingComparator(a, b, orderBy)
  //     : (a, b) => -descendingComparator(a, b, orderBy);
  // }

  // function stableSort(array, comparator) {
  //   const stabilizedThis = array.map((el, index) => [el, index]);
  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) {
  //       return order;
  //     }
  //     return a[1] - b[1];
  //   });
  //   return stabilizedThis.map((el) => el[0]);
  // }

  // function EnhancedTableHead(props) {
  //   const { order, orderBy, onRequestSort } = props;
  //   const createSortHandler = (property) => (event) => {
  //     onRequestSort(event, property);
  //   };

  //   return (
  //     <TableHead>
  //       <TableRow>
  //         {headCells.map((headCell) => (
  //           <TableCell
  //             key={headCell.id}
  //             align={headCell.numeric ? "right" : "left"}
  //             padding={"normal"}
  //             sortDirection={orderBy === headCell.id ? order : false}
  //           >
  //             <TableSortLabel
  //               active={orderBy === headCell.id}
  //               direction={orderBy === headCell.id ? order : "asc"}
  //               onClick={createSortHandler(headCell.id)}
  //             >
  //               {headCell.label}
  //               {orderBy === headCell.id ? (
  //                 <Box component="span" sx={visuallyHidden}>
  //                   {order === "desc"
  //                     ? "sorted descending"
  //                     : "sorted ascending"}
  //                 </Box>
  //               ) : null}
  //             </TableSortLabel>
  //           </TableCell>
  //         ))}
  //       </TableRow>
  //     </TableHead>
  //   );
  // }

  // EnhancedTableHead.propTypes = {
  //   numSelected: PropTypes.number.isRequired,
  //   onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  //   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  //   orderBy: PropTypes.string.isRequired,
  //   rowCount: PropTypes.number.isRequired,
  // };

  // function EnhancedTableToolbar(props) {
  //   const { numSelected } = props;

  //   return (
  //     <Toolbar
  //       sx={{
  //         pl: { sm: 2 },
  //         pr: { xs: 1, sm: 1 },
  //         ...(numSelected > 0 && {
  //           bgcolor: (theme) =>
  //             alpha(
  //               theme.palette.primary.main,
  //               theme.palette.action.activatedOpacity
  //             ),
  //         }),
  //       }}
  //     >
  //       <Typography
  //         sx={{ flex: "1 1 100%" }}
  //         variant="h6"
  //         id="tableTitle"
  //         component="div"
  //       >
  //         المنتجات
  //       </Typography>
  //       <button
  //         className="btn max-w-[120px]"
  //         onClick={() => {
  //           setJob("add");
  //           setModal(true);
  //         }}
  //       >
  //         اضافه منتج
  //       </button>
  //     </Toolbar>
  //   );
  // }

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     ),
  //   [order, orderBy, page, rowsPerPage, products]
  // );

  return (
    // <Box sx={{ width: "100%" }} className="container">
    //   <Paper sx={{ width: "100%", mb: 2 }}>
    //     <EnhancedTableToolbar />
    //     <TableContainer>
    //       <Table
    //         sx={{ minWidth: 750 }}
    //         aria-labelledby="tableTitle"
    //         size={dense ? "small" : "medium"}
    //       >
    //         <EnhancedTableHead
    //           order={order}
    //           orderBy={orderBy}
    //           onRequestSort={handleRequestSort}
    //           rowCount={rows.length}
    //         />
    //         <TableBody>
    //           {visibleRows.map((row, index) => {
    //             const labelId = `enhanced-table-checkbox-${index}`;
    //             return (
    //               <TableRow
    //                 hover
    //                 tabIndex={-1}
    //                 key={row.name}
    //                 id={row.id}
    //                 sx={{ cursor: "pointer" }}
    //               >
    //                 <TableCell
    //                   component="th"
    //                   id={labelId}
    //                   scope="row"
    //                   padding={"normal"}
    //                 >
    //                   {row.name}
    //                 </TableCell>
    //                 <TableCell align="right">{row.price}</TableCell>
    //                 <TableCell align="right">{row.quantity}</TableCell>
    //                 <TableCell align="right">{row.id}</TableCell>
    //                 <TableCell
    //                   align="right"
    //                   className="!flex !gap-4 !flex-row !text-2xl justify-end"
    //                 >
    //                   <button
    //                     onClick={() => {
    //                       setJob("تعديل");
    //                       setModal(true);
    //                       setProductName(row.name);
    //                       setProductPrice(row.price);
    //                       setProductQuantity(row.quantity);
    //                       setId(row.id);
    //                       console.log(row.id);
    //                     }}
    //                     title="تعديل المنتج"
    //                   >
    //                     <AiFillEdit />
    //                   </button>

    //                   <button
    //                     title="حذف المنتج"
    //                     onClick={() => deleteProductHandler(row.id)}
    //                   >
    //                     <AiFillDelete />
    //                   </button>
    //                 </TableCell>
    //               </TableRow>
    //             );
    //           })}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //     <TablePagination
    //       rowsPerPageOptions={[5, 10, 25]}
    //       component="div"
    //       count={rows.length}
    //       rowsPerPage={rowsPerPage}
    //       page={page}
    //       onPageChange={handleChangePage}
    //       onRowsPerPageChange={handleChangeRowsPerPage}
    //     />
    //   </Paper>
    //   <FormControlLabel
    //     control={<Switch checked={dense} onChange={handleChangeDense} />}
    //     label="تقليل المسافات"
    //   />
    // </Box>
    <>
      <div className="container !p-0 flex justify-between items-center mt-[20px]">
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          المنتجات
        </Typography>
        <button
          className="btn max-w-[120px]"
          onClick={() => {
            setJob("add");
            setModal(true);
          }}
        >
          اضافه منتج
        </button>
      </div>
      <div className="table-container container">
        <table>
          <thead>
            {tableHeads.map((head, n) => {
              return <th key={n}>{head}</th>;
            })}
            <th>ID</th>
            <th>اعدادت</th>
          </thead>
          <tbody>
            {visibleRows.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.id}</td>
                  <td>
                    <button
                      onClick={() => {
                        setJob("تعديل");
                        setModal(true);
                        setProductName(row.name);
                        setProductPrice(row.price);
                        setProductQuantity(row.quantity);
                        setId(row.id);
                        console.log(row.id);
                      }}
                      title="تعديل المنتج"
                    >
                      <AiFillEdit />
                    </button>

                    <button
                      title="حذف المنتج"
                      onClick={() => deleteProductHandler(row.id)}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center gap-4 items-center my-[20px]">
          <button
            disabled={products.length - rowsPerPage * page > 0 ? false : true}
            onClick={() => {
              setPage((pre) => pre + 1);
              setStartIndex((pre) => pre + rowsPerPage);
            }}
            className="btn max-w-[150px] p-[10px 20px]"
          >
            next page
          </button>
          <p>{page}</p>
          <button
            disabled={products.length - rowsPerPage * page < 0 ? false : true}
            onClick={() => {
              setPage((pre) => pre - 1);
              setStartIndex((pre) => pre - rowsPerPage);
            }}
            className="btn max-w-[150px] p-[10px 20px]"
          >
            prev page
          </button>
        </div>
      </div>
    </>
  );
}