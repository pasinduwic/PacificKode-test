import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import TableComp from "../Table";
import ViewStudent from "../student-comp/ViewStudent";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../API/axios";
import { Add } from "@mui/icons-material";
import {
  addAlertDetails,
  addModalTogal,
  setTableLoader
} from "../../redux/features/StatusVar";
import AddStudent from "../student-comp/AddStudent";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateModal = useSelector((state) => state.statusVar.value.updateModal);
  const addModal = useSelector((state) => state.statusVar.value.addModal);
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);
  const [tableData, setTableData] = useState([]);
  const [ClassroomData, setClassroomData] = useState([]);

  // const stdData = [
  //   {
  //     studentId: "344951f0-7f89-4f49-ba25-0d6725fc583d",
  //     firstName: "pasindu",
  //     lastName: "St",
  //     email: "string",
  //     contactPerson: "string",
  //     contactNo: 0,
  //     dob: "2023-07-09T12:51:50.329",
  //     age: 0,
  //     classRoomId: "e45874b2-bf90-4e48-f340-08db807b2ac1",
  //     classroom: {
  //       classroomId: "e45874b2-bf90-4e48-f340-08db807b2ac1",
  //       classroomName: "Class1"
  //     }
  //   },
  //   {
  //     studentId: "344951f0-7f89-4f49-ba25-0d6725fc583d",
  //     firstName: "pasindu",
  //     lastName: "St2",
  //     email: "string",
  //     contactPerson: "string",
  //     contactNo: 0,
  //     dob: "2023-07-09T12:51:50.329",
  //     age: 0,
  //     classRoomId: "e45874b2-bf90-4e48-f340-08db807b2ac1",
  //     classroom: {
  //       classroomId: "e45874b2-bf90-4e48-f340-08db807b2ac1",
  //       classroomName: "Class1"
  //     }
  //   }
  // ];

  // const classrooms = [
  //   {
  //     classroomId: "e45874b2-bf90-4e48-f340-08db807b2ac1",
  //     classroomName: "Class1"
  //   },
  //   {
  //     classroomId: "1ef24d58-c6a2-42ca-ec3f-08db807dc191",
  //     classroomName: "Class1"
  //   }
  // ];
  const columns = [
    { name: "Name", id: "name" },
    { name: "Class Room", id: "classroom.classroomName" }
  ];

  //fetching table data
  useEffect(() => {
    const controller = new AbortController();
    dispatch(setTableLoader(true));
    const getData = async () => {
      try {
        const responce = await axios.get("/api/student");
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

  useEffect(() => {
    const controller = new AbortController();
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

        setClassroomData(responce.data);
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
      }
    };
    getData();

    return () => controller.abort();
  }, []);

  return (
    <div
      className="students page-container"
      style={{ display: "flex", overflow: "hidden" }}
    >
      <div className="page-header">
        <h3>Students</h3>
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
          <ViewStudent classroomDetails={ClassroomData} />
        ) : addModal ? (
          <AddStudent classroomDetails={ClassroomData} />
        ) : (
          <TableComp columns={columns} tableData={tableData} />
        )}
      </div>
    </div>
  );
};

export default Students;
