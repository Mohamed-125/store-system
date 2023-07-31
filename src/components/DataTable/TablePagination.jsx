import React from "react";

const TablePagination = ({
  rowsPerPage,
  page,
  setPage,
  setStartIndex,
  products,
}) => {
  return (
    <div>
      <div className="flex justify-center flex-row-reverse gap-4 items-center my-[20px]">
        <button
          disabled={products.length - rowsPerPage * page > 0 ? false : true}
          onClick={() => {
            setPage((pre) => pre + 1);
            setStartIndex((pre) => pre + rowsPerPage);
          }}
          className="btn max-w-[150px] p-[10px 20px]"
        >
          الصفحه التاليه{" "}
        </button>
        <p>{page}</p>
        <button
          disabled={products.length - rowsPerPage * page <= 0 ? false : true}
          onClick={() => {
            setPage((pre) => pre - 1);
            setStartIndex((pre) => pre - rowsPerPage);
          }}
          className="btn max-w-[150px] p-[10px 20px]"
        >
          الصفحه السابقه{" "}
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
