import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import axios from "../../API/axios";
import { Add } from "@mui/icons-material";
import {
  addAlertDetails,
  addModalTogal,
  setTableLoader
} from "../../redux/features/StatusVar";
import TableComp from "../Table";
import ViewSubject from "../sub-comp/ViewSubject";
import AddSubject from "../sub-comp/AddSubject";

const Subjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateModal = useSelector((state) => state.statusVar.value.updateModal);
  const addModal = useSelector((state) => state.statusVar.value.addModal);
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);
  const [tableData, setTableData] = useState([]);

  // const subData = [
  //   {
  //     subjectId: "5c580b98-ce84-475c-0a7f-08db807b7f62",
  //     subjectName: "Sub1"
  //   },
  //   {
  //     subjectId: "897aeeba-6997-4c2b-be54-08db80841a79",
  //     subjectName: "sub2"
  //   }
  // ];

  const columns = [{ name: "Subject Name", id: "subjectName" }];

  //fetching table data
  useEffect(() => {
    const controller = new AbortController();
    dispatch(setTableLoader(true));
    const getData = async () => {
      try {
        const responce = await axios.get("/api/subject");
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
      className="subjects page-container"
      style={{ display: "flex", overflow: "hidden" }}
    >
      <div className="page-header">
        <h3>Subjects</h3>
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
          <ViewSubject />
        ) : addModal ? (
          <AddSubject />
        ) : (
          <TableComp columns={columns} tableData={tableData} />
        )}
      </div>
    </div>
  );
};

export default Subjects;
