import ChartBox from "../../components/chartBox/ChartBox";
import Charts from "../../components/charts/Charts";
import DashboardBox from "../../components/dashboard box/DashboardBox";
import "./Home.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { GiNetworkBars } from "react-icons/gi";
import { BsFillPieChartFill } from "react-icons/bs";

const Home = ({ setSearchDate, searchDate }) => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-top-section">
          <DashboardBox
            title="ارباح هذا الشهر"
            content="12"
            to="/invoices"
            Icon={AiFillDollarCircle}
          />
          <DashboardBox
            title="ارباح اليوم"
            content="1.2"
            setSearchDate={setSearchDate}
            searchDate={searchDate}
            to="/invoices"
            Icon={GiNetworkBars}
          />
          <DashboardBox
            title="عدد المنتجات"
            content="12099"
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
