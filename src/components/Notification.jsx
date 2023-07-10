import { useDispatch, useSelector } from "react-redux";
import { addAlertDetails } from "../redux/features/StatusVar";
import { Alert } from "reactstrap";

const Notifications = () => {
  const alertDetails = useSelector(
    (state) => state.statusVar.value.alertShowDetails
  );
  const dispatch = useDispatch();

  return (
    <>
      {/* notification */}
      <Alert
        color={alertDetails.type}
        isOpen={alertDetails.status}
        toggle={() =>
          dispatch(
            addAlertDetails({
              status: !alertDetails.status,
              type: "success",
              message: "test"
            })
          )
        }
      >
        {alertDetails.message}
      </Alert>
    </>
  );
};

export default Notifications;
