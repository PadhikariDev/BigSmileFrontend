import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Team from "./pages/dashboard/Team";
import Home from "./pages/dashboard/Home";
import Patients from "./pages/dashboard/Patients";
import Settings from "./pages/dashboard/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="addpatients" element={<Patients />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
