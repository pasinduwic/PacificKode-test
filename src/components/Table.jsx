import { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Spinner,
  Button,
  Table,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Delete } from "@mui/icons-material";

import Notifications from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlertDetails,
  deleteModalTogal,
  setRefresh,
  updateModalTogal
} from "../redux/features/StatusVar";
import { addUpdateData } from "../redux/features/GlobalData";
import { useLocation, useNavigate } from "react-router-dom";

const TableComp = ({ tableData, columns = [], endPoint, isView = false }) => {
  const deleteModal = useSelector((state) => state.statusVar.value.deleteModal);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const refreshData = useSelector((state) => state.statusVar.value.refreshData);

  useEffect(() => {}, []);

  //edit
  const handelClickRow = (row) => {
    dispatch(addUpdateData(row));
    dispatch(updateModalTogal(true));
  };

  //delete
  const handelDelete = (id) => {
    dispatch(deleteModalTogal(true));
    setDeleteId(id);
  };

  const deleteItem = async () => {
    setLoader(true);
    try {
      const responce = await axios.delete(endPoint + deleteId);

      if (responce.data.status !== 200) {
        return dispatch(
          addAlertDetails({
            status: true,
            type: "error",
            message: "Something went wrong!"
          })
        );
      }
      if (responce.data.errorSpecified) {
        return dispatch(
          addAlertDetails({
            status: true,
            type: "error",
            message: responce.data.errorSpecified
          })
        );
      }

      dispatch(
        addAlertDetails({
          status: true,
          type: "success",
          message: "Item deleted successfully!"
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
      dispatch(deleteModalTogal(false));
      setLoader(false);
    }
  };

  return (
    <div className="tb">
      <Table hover>
        <thead>
          <tr>
            {columns.map((col) => (
              <th>{col.name}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr>
              {columns.map((col) =>
                col.name === "Name" ? (
                  <td onClick={() => handelClickRow(data)}>
                    {data.firstName + " " + data.lastName}
                  </td>
                ) : (
                  <td onClick={() => handelClickRow(data)}> {data[col.id]}</td>
                )
              )}
              <td>
                <Button
                  onClick={() => handelDelete(data[Object.keys(data)[0]])}
                >
                  {" "}
                  <Delete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete modal */}
      <Modal
        isOpen={deleteModal}
        onHide={() => dispatch(deleteModalTogal(false))}
        centered
      >
        <ModalHeader closeButton>Delete</ModalHeader>
        <ModalBody>
          <h4>Are you sure you want to delete this?</h4>
          <span>Deleteing will remove data permanently...</span>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => dispatch(deleteModalTogal(false))}>
            Close
          </Button>
          <Button type="submit" onClick={deleteItem}>
            {loader ? <Spinner animation="border" size="sm" /> : "Delete"}
          </Button>
        </ModalFooter>
      </Modal>

      <Notifications />
    </div>
  );
};

export default TableComp;
