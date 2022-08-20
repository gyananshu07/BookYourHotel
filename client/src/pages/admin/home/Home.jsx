import "./home.scss";

import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/navbar";
import Widgets from "./Widgets";
import Featured from "../../../components/admin/featured/featured";
import Charts from "../../../components/admin/charts/charts";
import List from "../../../components/admin/table/Table";

const Home = () => {
  return (
    <div className="homeAdmin">
      <Sidebar />
      <div className="homeAdminContainer">
        <Navbar />
        <Widgets />
        <div className="charts">
          <Featured />
          <Charts aspect={2 / 1} title="Last 8 Months Graph" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
