// /layouts/AdminLayout.jsx
import AdminHeader from "../components/admin/AdminHeader"
import AdminSidebar from "../components/admin/AdminSidebar"

const AdminLayout = ({ children }) => {

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}

        <AdminHeader />
        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout

