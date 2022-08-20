import Datatable from "../../../components/admin/dataTable/DataTable";
import Navbar from "../../../components/admin/navbar/navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import "./list.scss";

const ListAdmin = ({ columns }) => {
  return (
    <div className="listAdmin">
      <Sidebar />
      <div className="listAdminContainer">
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default ListAdmin;
