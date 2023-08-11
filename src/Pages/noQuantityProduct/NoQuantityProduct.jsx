import DataTable from "../../components/DataTable/DataTable";

const NoQuantityProduct = ({ noQuantityProducts, setNoQuantityProducts }) => {
  return (
    <>
      <DataTable
        job="edit"
        products={noQuantityProducts}
        tableHeads={["اسم المنتج", "سعر المنتج", "كميه المنتج", "أعدادات"]}
      />
    </>
  );
};

export default NoQuantityProduct;
