import ChartBox from "../../components/chartBox/ChartBox";
import Charts from "../../components/charts/Charts";
import DashboardBox from "../../components/dashboard box/DashboardBox";
import "./Home.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { GiCalendarHalfYear, GiNetworkBars } from "react-icons/gi";
import { BsFillPieChartFill } from "react-icons/bs";

const Home = ({ setSearchDate, searchDate, products, invoices }) => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-top-section">
          <DashboardBox
            title="ارباح هذا الشهر"
            content={invoices
              .filter((product) => {
                if (product?.date) {
                  if (
                    new Date().getMonth() ===
                      new Date(
                        new Date(product?.date).setHours(0, 0, 0, 0)
                      ).getMonth() &&
                    new Date().getFullYear() ===
                      new Date(
                        new Date(product?.date).setHours(0, 0, 0, 0)
                      ).getFullYear()
                  ) {
                    return product;
                  }
                } else {
                  return product;
                }
              })
              .reduce((pre, curr) => {
                return pre + curr["invoice-price"];
              }, 0)}
            to="/invoices"
            Icon={AiFillDollarCircle}
          />
          <DashboardBox
            title="ارباح هذه السنه"
            content={invoices
              .filter((product) => {
                if (product?.date) {
                  if (
                    new Date().getFullYear() ===
                    new Date(
                      new Date(product?.date).setHours(0, 0, 0, 0)
                    ).getFullYear()
                  ) {
                    return product;
                  }
                } else {
                  return product;
                }
              })
              .reduce((pre, curr) => {
                return pre + curr["invoice-price"];
              }, 0)}
            to="/invoices"
            Icon={GiCalendarHalfYear}
          />
          <DashboardBox
            title="ارباح اليوم"
            content={invoices
              .filter((product) => {
                if (product?.date && searchDate) {
                  if (product?.date === searchDate.setHours(0, 0, 0, 0)) {
                    return product;
                  }
                } else {
                  return product;
                }
              })
              .reduce((pre, curr) => {
                return pre + curr["invoice-price"];
              }, 0)}
            to="/invoices"
            setSearchDate={setSearchDate}
            Icon={GiNetworkBars}
          />
          <DashboardBox
            title="عدد المنتجات"
            content={products?.length}
            to="/products"
            Icon={BsFillPieChartFill}
          />
        </div>
        <div className="dashboard-bottom-section"></div>
      </div>
      {/*     
<div className="flex flex-row flex-wrap min-h-fit">
  <div className="basis-2/3 min-h-fit"><ChartBox/></div>
  <div className="basis-1/3 px-3 min-h-fit"><Charts/></div>
</div> */}
    </>
  );
};

export default Home;
