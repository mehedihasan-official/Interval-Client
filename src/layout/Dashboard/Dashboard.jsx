import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarOnDB from "./DashboardNav/NavbarOnDB/NavbarOnDB";

const menuItems = [
  { name: "Gateways", path: "/dashboard/gateways" },
  { name: "Exchange", path: "/dashboard/exchange" },
  { name: "Membership", path: "/dashboard/membership" },
  { name: "Cruises", path: "/dashboard/cruises" },
  { name: "Air Travel", path: "/dashboard/air-travel" },
  { name: "Car Rentals", path: "/dashboard/car-rentals" },
  { name: "My Account", path: "/dashboard/my-account" },
  { name: "My Bookings", path: "/dashboard/my-bookings" },
];

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Items where NavbarOnDB should not be shown
  const excludedItems = [
    "Cruises",
    "Air Travel",
    "Car Rentals",
    "My Bookings",
    "My Account",
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#18294B] text-white py-4 px-4 md:px-8 z-50 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-2xl md:text-3xl font-bold">Interval</span>
        </div>

        {/* Desktop Horizontal Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item)}
              className={`text-sm lg:text-base font-medium transition-all pb-1 ${
                activeItem.name === item.name
                  ? "border-b-2 border-white"
                  : "text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-400"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* User profile icon or logout could go here */}
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-[70] transform transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-[#18294B] p-6 text-white font-bold text-xl">
          Menu
        </div>
        <div className="flex flex-col py-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`px-6 py-3 text-left font-medium border-b border-gray-100 ${
                activeItem.name === item.name
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
              onClick={() => {
                setActiveItem(item);
                toggleSidebar();
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow pt-20 flex flex-col">
        {/* Dashboard Navbar (Sub-navigation) */}
        {!excludedItems.includes(activeItem.name) && (
          <div className="bg-white shadow-sm border-b sticky top-20 z-40">
            <NavbarOnDB activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
        )}

        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
