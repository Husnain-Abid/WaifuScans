"use client"

import { useEffect, useState } from "react"
import { Search, Filter, ArrowUp, ArrowDown, Download, Plus, CreditCard, Calendar, DollarSign } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import { BASE_URL } from "../../utils/apiURL"

const Payments = () => {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/payments`)
      const data = await res.json()
      setPayments(data)
    } catch (err) {
      console.error("Failed to fetch payments", err)
    }
  }


  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [methodFilter, setMethodFilter] = useState("All")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const filteredPayments = payments
    .filter((payment) => {
      const matchesSearch = payment.client.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || payment.status === statusFilter
      const matchesMethod = methodFilter === "All" || payment.method === methodFilter
      return matchesSearch && matchesStatus && matchesMethod
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })



  const handleApproval = async (id, isApprove) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/payments/${id}/${isApprove ? "approve" : "reject"}`, {
        method: "PUT"
      })
      if (res.ok) {
        fetchPayments()
      } else {
        alert("Failed to update payment")
      }
    } catch (err) {
      console.error("Error updating payment", err)
    }
  }



  console.log("payments", payments);



  return (

    <AdminLayout>

      <div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("client")}
                  >
                    <div className="flex items-center">
                      Client
                      {sortConfig.key === "client" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
                      {sortConfig.key === "amount" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("method")}
                  >
                    <div className="flex items-center">
                      Method
                      {sortConfig.key === "method" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {sortConfig.key === "date" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {sortConfig.key === "status" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <div className="text-sm font-medium text-gray-900">{payment.client}</div> */}

                      <div className="text-sm font-medium text-gray-900">{payment.user.name}</div>
                      <div className="text-sm text-gray-500">{payment.user.email}</div>

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${payment.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{payment.method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{payment.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${payment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No payments found matching your criteria.</p>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredPayments.length} of {payments.length} payments
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>

  )
}

export default Payments
