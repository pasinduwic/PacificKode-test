import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Notifications from "../Notification";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="home"
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        marginTop: "120px"
      }}
    >
      <h1 style={{ margin: "40px" }}>Home</h1>
      <div>
        <Card
          className="w-100"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "20px",
            margin: "10px"
          }}
        >
          <Button
            style={{ width: "20%" }}
            // color="primary"
            // outline
            onClick={() => navigate("/students")}
          >
            {" "}
            Students
          </Button>
          <Button
            style={{ width: "20%" }}
            // color="primary"
            // outline
            onClick={() => navigate("/teachers")}
          >
            {" "}
            Teacers
          </Button>
        </Card>
        <Card
          className="w-100"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "20px",
            margin: "10px"
          }}
        >
          <Button
            style={{ width: "20%" }}
            onClick={() => navigate("/subjects")}
          >
            {" "}
            Subjects
          </Button>
          <Button style={{ width: "20%" }} onClick={() => navigate("/classes")}>
            {" "}
            Classes
          </Button>
        </Card>
        <Card
          className="w-100"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "20px",
            margin: "10px"
          }}
        >
          <Button
            style={{ width: "40%" }}
            outline
            onClick={() => navigate("/alloceteSubject")}
          >
            {" "}
            Allocate Subject
          </Button>
          <Button
            style={{ width: "40%" }}
            outline
            onClick={() => navigate("/alloceteClass")}
          >
            {" "}
            Allocate Class
          </Button>
        </Card>
        <Card
          className="w-100"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "20px",
            margin: "10px"
          }}
        >
          <Button
            className="w-100"
            color="primary"
            outline
            onClick={() => navigate("/studentDetailsReport")}
          >
            {" "}
            Student Details Report
          </Button>
        </Card>
      </div>
      <Notifications />
    </div>
  );
};

export default Home;
