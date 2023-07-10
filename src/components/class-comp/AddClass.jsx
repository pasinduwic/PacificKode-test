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

const AddClass = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [addData, setAddData] = useState();
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);

  const handleOnChange = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newData = { ...addData };
    newData[fieldName] = fieldValue;
    setAddData(newData);
    console.log(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const responce = await axios.post("/api/class");
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
          <h5>Add Class</h5>

          <CloseButton onClick={() => dispatch(addModalTogal(false))} />
        </div>
        <div className="page-content" style={{ textAlign: "left" }}>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Class Room Name</Label>
                  <Input
                    id="classroomName"
                    name="classroomName"
                    placeholder=""
                    type="text"
                    value={addData?.classroomName}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "10px"
                }}
              >
                <Button style={{ width: "20%" }} onClick={handleSubmit}>
                  {loader ? <Spinner animation="border" size="sm" /> : "Save"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AddClass;
