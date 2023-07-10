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
import { useDispatch } from "react-redux";
import { addAlertDetails, addModalTogal } from "../../redux/features/StatusVar";

const StudentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [studentId, setStudentId] = useState();
  const [selectedStudent, setSelectedStudent] = useState();

  const [allocatedData, setAllocatedData] = useState([]);
  const [studentsData, setstudentsData] = useState([]);

  //get init data
  useEffect(() => {
    const getData = async () => {
      try {
        const responce = await axios.get("/api/student");
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

        setstudentsData(responce.data);
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

  const handleGetData = async (e) => {
    e.preventDefault();
    setLoader(true);
    const student = studentsData.filter((st) => st.studentId === studentId);
    setSelectedStudent(student);
    try {
      const responce = await axios.get("/api/studentDetailsReport" + studentId);
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
            <h6>Student Details</h6>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Student</Label>
                    <Input
                      id="clasroomId"
                      name="classroomId"
                      type="select"
                      defaultValue={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                    >
                      {studentsData?.map((student) => (
                        <option value={student.studentId}>
                          {student.firstName + " " + student.lastName}
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
                    {loader ? <Spinner animation="border" size="sm" /> : "Load"}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Class Room</Label>
                    <Input
                      disabled
                      type="text"
                      value={selectedStudent?.classroom.classroomName}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Contact Person</Label>
                    <Input
                      disabled
                      type="text"
                      value={selectedStudent?.contactPerson}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      disabled
                      type="text"
                      value={selectedStudent?.email}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">Contact No</Label>
                    <Input
                      disabled
                      type="text"
                      value={selectedStudent?.contactNo}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleEmail">DOB</Label>
                    <Input disabled type="text" value={selectedStudent?.dob} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Card>
        </Card>
        <Card className="w-100 p-4">
          <Card className="w-100 p-4">
            <h6>Teacher & Subject Details</h6>
            <Form>
              <Row>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocatedData?.map((data) => (
                      <tr>
                        <td>{data.subjectName}</td>
                        <td>{data.teacherName}</td>
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

export default StudentDetails;
