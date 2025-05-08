// App.jsx
import { BrowserRouter , Routes, Route } from "react-router-dom";

// Import your pages
import Home from "./pages/Home";
import AdminDashboard from "./pages/admin/Dashboard";
import Commission from "./pages/Commission";
import Account from "./pages/Account";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import GalleryPage from "./components/common/GalleryPage";
import Commissions from "./pages/admin/Commissions";
import Payments from "./pages/admin/Payments";
import ProfileSettings from "./pages/admin/WebsiteSettings";
import UploadImage from "./pages/admin/UploadImage";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageCharacters from "./pages/admin/ManageCharacters";
import WebsiteSettings from "./pages/admin/WebsiteSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/commissions" element={<Commission/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/gallery/:id" element={<GalleryPage />} />

        

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/upload-image" element={<UploadImage />} />
        <Route path="/admin/manage-characters" element={<ManageCharacters />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/commissions" element={<Commissions />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/website-settings" element={<WebsiteSettings />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
