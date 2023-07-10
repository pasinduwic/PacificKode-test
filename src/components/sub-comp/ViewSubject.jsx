import { useEffect, useState } from "react";
import axios from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  updateModalTogal,
  addAlertDetails,
  setRefresh
} from "../../redux/features/StatusVar";
import { addUpdateData } from "../../redux/features/GlobalData";

const ViewSubject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);
  const updateDataInitial = useSelector(
    (state) => state.globalData.value.updateData
  );
  const _id = updateDataInitial?.studentId;

  const handleOnChange = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newData = { ...updateDataInitial };
    newData[fieldName] = fieldValue;
    dispatch(addUpdateData(newData));
    console.log(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const responce = await axios.put("/api/subject" + _id, updateDataInitial);
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
      dispatch(updateModalTogal(false));
      setLoader(false);
    }
  };
  return (
    <div className="" style={{ display: "flex", overflow: "hidden" }}>
      <Card className="w-100 p-4">
        <div className="page-header">
          <h5>Subject Details</h5>

          <CloseButton onClick={() => dispatch(updateModalTogal(false))} />
        </div>
        <div className="page-content" style={{ textAlign: "left" }}>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleEmail">Subject Name</Label>
                  <Input
                    id="subjectName"
                    name="subjectName"
                    placeholder=""
                    type="text"
                    value={updateDataInitial.subjectName}
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
                  {loader ? <Spinner animation="border" size="sm" /> : "Update"}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ViewSubject;
