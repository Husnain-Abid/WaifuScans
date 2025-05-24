// App.jsx
import { Routes, Route } from "react-router-dom";

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
import UploadImage from "./pages/admin/UploadImage";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageCharacters from "./pages/admin/ManageCharacters";
import WebsiteSettings from "./pages/admin/WebsiteSettings";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>

      <Routes>


        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/commissions" element={<Commission />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
        <Route path="/gallery-page/:id" element={<GalleryPage />} />



        {/* Admin Routes */}

        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="admin"> <AdminDashboard /> </ProtectedRoute>
        } />

        <Route path="/admin/upload-image" element={
          <ProtectedRoute role="admin"> <UploadImage /> </ProtectedRoute>
        } />

        <Route path="/admin/manage-characters" element={
          <ProtectedRoute role="admin"> <ManageCharacters /> </ProtectedRoute>
        } />

        <Route path="/admin/manage-users" element={
          <ProtectedRoute role="admin"> <ManageUsers /> </ProtectedRoute>
        } />

        <Route path="/admin/commissions" element={
          <ProtectedRoute role="admin"> <Commissions /> </ProtectedRoute>
        } />

        <Route path="/admin/payments" element={
          <ProtectedRoute role="admin"> <Payments /> </ProtectedRoute>
        } />

        <Route path="/admin/website-settings" element={
          <ProtectedRoute role="admin"> <WebsiteSettings /> </ProtectedRoute>
        } />

      </Routes>

      <ToastContainer />

    </>
  );
}

export default App;
