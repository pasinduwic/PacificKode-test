import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../API/axios";
import { Add } from "@mui/icons-material";
import {
  addAlertDetails,
  addModalTogal,
  setTableLoader
} from "../../redux/features/StatusVar";
import ViewTeacher from "../teacher-comp/ViewTeacher";
import AddTeacher from "../teacher-comp/AddTeacher";
import TableComp from "../Table";

const Teachers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateModal = useSelector((state) => state.statusVar.value.updateModal);
  const addModal = useSelector((state) => state.statusVar.value.addModal);
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);
  const [tableData, setTableData] = useState([]);

  const columns = [{ name: "Name", id: "name" }];

  //fetching table data
  useEffect(() => {
    const controller = new AbortController();
    dispatch(setTableLoader(true));
    const getData = async () => {
      try {
        const responce = await axios.get("/api/teacher");
        if (responce.data.status !== 200) {
          return dispatch(
            addAlertDetails({
              status: true,
              type: "error",
              message: "Something went wrong!"
            })
          );
        }

        setTableData(responce.data);
        // console.log(tableData);
      } catch (e) {
        dispatch(
          addAlertDetails({
            status: true,
            type: "error",
            message: "failed to load data!"
          })
        );
      } finally {
        dispatch(setTableLoader(false));
      }
    };
    getData();

    return () => controller.abort();
  }, [refreshData]);

  return (
    <div
      className="teachers page-container"
      style={{ display: "flex", overflow: "hidden" }}
    >
      <div className="page-header">
        <h3>Teachers</h3>
        <div className="header-r">
          <Button
            color="primary"
            outline
            onClick={() => dispatch(addModalTogal(true))}
          >
            <Add />
          </Button>
          <Button color="primary" outline onClick={() => navigate("/")}>
            {" "}
            Home
          </Button>
        </div>
      </div>
      <div className="page-content">
        {updateModal ? (
          <ViewTeacher />
        ) : addModal ? (
          <AddTeacher />
        ) : (
          <TableComp columns={columns} tableData={tableData} />
        )}
      </div>
    </div>
  );
};

export default Teachers;
