import { useEffect, useState } from "react";
import axios from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Button,
  Card,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Spinner
} from "reactstrap";
import {
  addModalTogal,
  addAlertDetails,
  setRefresh
} from "../../redux/features/StatusVar";

const AddStudent = (classroomDetails) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [addData, setAddData] = useState();
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);
  useEffect(() => {}, []);
  const datForPicker = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const handleOnChange = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newData = { ...addData };
    newData[fieldName] = fieldValue;
    if (newData.dob !== "") {
      const countDays = moment().diff(moment(newData.dob), "years");

      // setDateCount(countDays);
      newData.age = countDays;
    }
    setAddData(newData);
    console.log(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const responce = await axios.post("/api/student");
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
          message: "Item updated successfully!"
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
  return (
    <div className="" style={{ display: "flex", overflow: "hidden" }}>
      <Card className="w-100 p-4">
        <div className="page-header">
          <h5>Add Student</h5>

          <CloseButton onClick={() => dispatch(addModalTogal(false))} />
        </div>
        <div className="page-content" style={{ textAlign: "left" }}>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder=""
                    type="text"
                    value={addData?.firstName}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder=""
                    type="text"
                    value={addData?.lastName}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    placeholder=""
                    type="text"
                    value={addData?.contactPerson}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Contact Number</Label>
                  <Input
                    id="contactNo"
                    name="contactNo"
                    placeholder=""
                    type="number"
                    value={addData?.contactNo}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder=""
                    type="text"
                    value={addData?.email}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>DOB</Label>
                  <Input
                    id="dob"
                    name="dob"
                    placeholder=""
                    type="date"
                    value={datForPicker(addData?.dob)}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    placeholder=""
                    type="number"
                    disabled
                    value={addData?.age}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Class Room</Label>
                  <Input
                    id="clasroomId"
                    name="classroomId"
                    type="select"
                    defaultValue={addData?.classroomId}
                    onChange={handleOnChange}
                  >
                    {classroomDetails.classroomDetails.map((c) => (
                      <option value={c.classroomId}>{c.classroomName}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0 10px"
              }}
            >
              <Button style={{ width: "20%" }} onClick={handleSubmit}>
                {loader ? <Spinner animation="border" size="sm" /> : "Save"}
              </Button>
            </Row>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AddStudent;
