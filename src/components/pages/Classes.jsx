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
import TableComp from "../Table";
import ViewClass from "../class-comp/ViewClass";
import AddClass from "../class-comp/AddClass";

const Classes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateModal = useSelector((state) => state.statusVar.value.updateModal);
  const addModal = useSelector((state) => state.statusVar.value.addModal);
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);
  const [tableData, setTableData] = useState([
    {
      classroomId: "e45874b2-bf90-4e48-f340-08db807b2ac1",
      classroomName: "Class1"
    },
    {
      classroomId: "1ef24d58-c6a2-42ca-ec3f-08db807dc191",
      classroomName: "Class1"
    }
  ]);

  // const classData = [
  //   {
  //     classroomId: "e45874b2-bf90-4e48-f340-08db807b2ac1",
  //     classroomName: "Class1"
  //   },
  //   {
  //     classroomId: "1ef24d58-c6a2-42ca-ec3f-08db807dc191",
  //     classroomName: "Class1"
  //   }
  // ];

  const columns = [{ name: "Class Name", id: "classroomName" }];

  //fetching table data
  useEffect(() => {
    const controller = new AbortController();
    dispatch(setTableLoader(true));
    const getData = async () => {
      try {
        const responce = await axios.get("/api/class");
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
      className="classes page-container"
      style={{ display: "flex", overflow: "hidden" }}
    >
      <div className="page-header">
        <h3>Classes</h3>
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
          <ViewClass />
        ) : addModal ? (
          <AddClass />
        ) : (
          <TableComp columns={columns} tableData={tableData} />
        )}
      </div>
    </div>
  );
};

export default Classes;
