import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Teachers from "./components/pages/Teachers";
import Students from "./components/pages/Students";
import Subjects from "./components/pages/Subjects";
import Classes from "./components/pages/Classes";
import AlloceteSubject from "./components/pages/AllocateSubject";
import AlloceteClass from "./components/pages/AllocateClass";
import StudentDetails from "./components/pages/StudentDetails";
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/alloceteSubject" element={<AlloceteSubject />} />
        <Route path="/alloceteClass" element={<AlloceteClass />} />
        <Route path="/studentDetailsReport" element={<StudentDetails />} />
      </Routes>
    </div>
  );
}
