import { Bell, ChevronDown } from "lucide-react"


export default function AdminHeader() {

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center">
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <img
                className="w-8 h-8 rounded-full"
                src="https://randomuser.me/api/portraits/women/24.jpg"
                alt="User avatar"
              />
              <div className="hidden md:block">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">Moni Roy</span>
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
                </div>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>

  )
}
