import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpList from "./pages/EmpList";
import EmpCreate from "./pages/EmpCreate";
import EmpDetails from "./pages/EmpDetails";
import EmpEdit from "./pages/EmpEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {/* <h1 className="text-center py-10 text-2xl font-semibold">
        CRUD APPLICATION
      </h1> */}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmpList />} />
          <Route path="/employee/create" element={<EmpCreate />} />
          <Route path="/employee/Detail/:empid" element={<EmpDetails />} />
          <Route path="/employee/edit/:empid" element={<EmpEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
