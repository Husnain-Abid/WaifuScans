import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Upload,
  FileText,
  Users,
  DollarSign,
  CreditCard,
  Settings,
  Menu,
  LogOut,
} from "lucide-react"

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const menuItems = [
    { path: "/admin/dashboard", name: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/admin/upload-image", name: "UploadImage", icon: <Upload className="w-5 h-5" /> },
    { path: "/admin/manage-characters", name: "ManageCharacters", icon: <FileText className="w-5 h-5" /> },
    { path: "/admin/manage-users", name: "ManageUsers", icon: <Users className="w-5 h-5" /> },
    { path: "/admin/commissions", name: "Commissions", icon: <DollarSign className="w-5 h-5" /> },
    // { path: "/admin/payments", name: "Payments", icon: <CreditCard className="w-5 h-5" /> },
    { path: "/admin/website-settings", name: "WebsiteSettings", icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <div className={`flex flex-col h-screen ${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          {sidebarOpen ? "WaifuScans" : "WS"}
        </Link>
        <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-100">
          <Menu className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button at the Bottom */}
      <div className="border-t">
        <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100">
          <LogOut className="w-5 h-5 mr-3" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}
