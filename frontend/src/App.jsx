import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./pages/Form";

import Login from "./pages/Login/Login";
import SignUp from "./pages/Registration/SignUp";
import StudentProfile from "./pages/StudentProfile";
import { Toaster } from "react-hot-toast";
import AssignAuto from "./component/AssignAuto";
import CounsellorDashboard from "./pages/counsellor/Dashboard";
// import AdminDashboard from './pages/counsellor/Dashboard';
import ForgetPass from "./pages/Forgot-password/ForgetPass";
import ShowAllleads from "./pages/admin/showAllLeads";
import ArnavLeads from "./pages/arnav/arnavLeads";
import AgentLeads from "./pages/agent/AgentLeads";
import ProtectedRoutes from "../ProtectedRoutes";
// import AdminSlotSelect from "./pages/admin/AdminSlotSelect";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Form />} exact />
          <Route
            path="/counsellor-profile/:id"
            element={<CounsellorDashboard />}
          />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/student/:id" element={<StudentProfile />} />
          <Route path="/assignAuto" element={<AssignAuto />} />
          <Route path="/forgot-password" element={<ForgetPass />} />
          <Route path="/showAllLeads" element={ <ShowAllleads/>} />
          <Route path="/showAllLeads" element={ <ShowAllleads/>} />
          <Route path="/agentLeads" element={<AgentLeads />} />
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/AdminSlotSelect" element={<AdminSlotSelect />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;