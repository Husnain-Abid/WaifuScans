"use client"

import { UserCheck, Package, Activity } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
    <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  </div>
)

const Dashboard = () => {
  // Dummy Data
  const stats = [
    {
      title: "Total Users",
      value: 3420,
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Characters",
      value: 140,
      icon: <Activity className="w-6 h-6 text-purple-600" />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Images",
      value: 12500,
      icon: <Package className="w-6 h-6 text-pink-600" />,
      bgColor: "bg-pink-100",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joined: "2025-05-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joined: "2025-05-06",
    },
    {
      id: 3,
      name: "Ali Khan",
      email: "ali@example.com",
      joined: "2025-05-07",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Registered Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Join Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {recentUsers.length === 0 && (
            <p className="text-gray-500 mt-4">No recent users found.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
