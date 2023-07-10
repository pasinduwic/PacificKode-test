import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  FormGroup,
  Col,
  Row,
  Label,
  Input,
  Spinner,
  Table
} from "reactstrap";
import axios from "../../API/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlertDetails,
  addModalTogal,
  setRefresh
} from "../../redux/features/StatusVar";

const AlloceteSubject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);
  const [loader, setLoader] = useState(false);
  const [teacherId, setTeacherId] = useState();
  const [addData, setAddData] = useState([]);
  const [allocatedData, setAllocatedData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);

  //get init data
  useEffect(() => {
    const getData = async () => {
      try {
        const responceTeacher = await axios.get("/api/teacher");
        const responceSubject = await axios.get("/api/subject");
        // console.log(responce.data);
        if (
          responceTeacher.data.status !== 200 ||
          responceTeacher.data.status !== 200
        ) {
          return dispatch(
            addAlertDetails({
              status: true,
              type: "error",
              message: "Something went wrong!"
            })
          );
        }

        setTeachersData(responceTeacher.data);
        setSubjectData(responceSubject.data);
      } catch (e) {
        dispatch(
          addAlertDetails({
            status: true,
            type: "error",
            message: "Something went wrong!"
          })
        );
      } finally {
        dispatch(addModalTogal(false));
        setLoader(false);
      }
    };

    getData();
  }, []);
  // add data change
  const handleOnChange = (e) => {
    const newData = {
      teacherId: teacherId,
      subjectId: e.target.value
    };
    setAddData(newData);
    // console.log(newData);
  };

  const getAllocatedData = async () => {
    try {
      const responce = await axios.get("/api/allocateSubject" + teacherId);
      // console.log(responce.data);
      if (responce.data.status !== 200) {
        return dispatch(
          addAlertDetails({
            status: true,
            type: "error",
            message: "Something went wrong!"
          })
        );
      }
      setAllocatedData(responce.data);
    } catch (e) {
      dispatch(
        addAlertDetails({
          status: true,
          type: "error",
          message: "Something went wrong!"
        })
      );
    } finally {
      dispatch(addModalTogal(false));
      setLoader(false);
    }
  };

  // get allocared data
  const handleGetData = async (e) => {
    e.preventDefault();
    setLoader(true);

    getAllocatedData();
  };

  // add allocation
  const handleAllocate = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const responce = await axios.post("/api/allocateSubject", addData);
      // console.log(responce.data);
      if (responce.data.status !== 200) {
        return dispatch(
          addAlertDetails({
            status: true,
            type: "error",
            message: "Something went wrong!"
          })
        );
      }
      dispatch(
        addAlertDetails({
          status: true,
          type: "success",
          message: "Item allocted successfully!"
        })
      );
      dispatch(setRefresh(!refreshData));
    } catch (e) {
      dispatch(
        addAlertDetails({
          status: true,
          type: "error",
          message: "Something went wrong!"
        })
      );
    } finally {
      dispatch(addModalTogal(false));
      setLoader(false);
    }
  };

  const handleDeallocate = async (id) => {
    setLoader(true);

    try {
      const responce = await axios.delete("/api/allocateSubject" + id);
      // console.log(responce.data);
      if (responce.data.status !== 200) {
        return dispatch(
          addAlertDetails({
            status: true,
            type: "error",
            message: "Something went wrong!"
          })
        );
      }
      dispatch(
        addAlertDetails({
          status: true,
          type: "success",
          message: "Item Deleted successfully!"
        })
      );
      dispatch(setRefresh(!refreshData));
    } catch (e) {
      dispatch(
        addAlertDetails({
          status: true,
          type: "error",
          message: "Something went wrong!"
        })
      );
    } finally {
      dispatch(addModalTogal(false));
      setLoader(false);
    }
  };
  // useEffect(() => {
  //   getAllocatedData();
  // }, [refreshData]);

  return (
    <div
      className="allocateSubject page-container"
      style={{ display: "flex", overflow: "hidden" }}
    >
      <div className="page-header">
        <h3>Allocete Subject</h3>
        <div className="header-r">
          <Button color="primary" outline onClick={() => navigate("/")}>
            {" "}
            Home
          </Button>
        </div>
      </div>
      <div className="page-content">
        <Card className="w-100 p-4">
          <Card className="w-100 p-4">
            <h6>Teacher Details</h6>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Teacher</Label>
                    <Input
                      id="clasroomId"
                      name="classroomId"
                      type="select"
                      defaultValue={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                    >
                      {teachersData?.map((teacher) => (
                        <option value={teacher.teacherId}>
                          {teacher.firstName + " " + teacher.lastName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px"
                  }}
                >
                  <Button style={{ width: "20%" }} onClick={handleGetData}>
                    {loader ? <Spinner animation="border" size="sm" /> : "Save"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Card>
        <Card className="w-100 p-4">
          <Card className="w-100 p-4">
            <h6>Allocate subject</h6>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">subject</Label>
                    <Input
                      id="clasroomId"
                      name="classroomId"
                      type="select"
                      defaultValue={teacherId}
                      onChange={handleOnChange}
                      placeholder="Select subject"
                    >
                      {subjectData?.map((subject) => (
                        <option value={subject.subjectId}>
                          {subject.subjectName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px"
                  }}
                >
                  <Button style={{ width: "20%" }} onClick={handleAllocate}>
                    {loader ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Allocate"
                    )}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th style={{ width: "10%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocatedData?.map((data) => (
                      <tr>
                        <td>{data.subject.subjectName}</td>
                        <td>
                          <Button
                            onClick={() =>
                              handleDeallocate(data.allocateSubjectId)
                            }
                          >
                            {loader ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Deallocate"
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </Form>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default AlloceteSubject;
