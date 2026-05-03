import { useContext, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaHome, FaUserCircle, FaWpforms } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdLibraryBooks, MdViewQuilt } from "react-icons/md";
import { AuthContext } from "../../providers/AuthProvider";
import { TbBeach } from "react-icons/tb";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleMenuItemClick = (path) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const adminLinks = [
    { path: "/admin-panel/admin-overview", label: "Overview", icon: <MdViewQuilt /> },
    { path: "/admin-panel/users-bookings", label: "Users Bookings", icon: <MdLibraryBooks /> },
    { path: "/admin-panel/user-control", label: "User Control", icon: <AiOutlineUsergroupAdd /> },
    { path: "/input-resort-data", label: "Resort Input Form", icon: <FaWpforms /> },
    { path: "/admin-panel/admin-control", label: "Admin Control", icon: <RiAdminLine /> },
  ];

  const sharedLinks = [
    { path: "/dashboard/gateways", label: "Home", icon: <FaHome /> },
    { path: "/resort-directory", label: "Resort Directory", icon: <TbBeach /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#18294B] text-white">
        <div className="p-6 border-b border-blue-900">
          <Link to="/" className="text-2xl font-bold tracking-tight">interval</Link>
          <p className="text-xs text-blue-300 mt-1 uppercase tracking-widest">Admin Portal</p>
        </div>
        <nav className="flex-grow py-6 overflow-y-auto">
          <ul className="space-y-1 px-4">
            {adminLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-6 border-t border-blue-900 mx-4"></div>
          <ul className="space-y-1 px-4">
            {sharedLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium text-gray-300"
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-900">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold"
          >
            <FaUserCircle className="text-xl" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-[#18294B] text-white p-4 z-[60] flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="p-2 hover:bg-blue-800 rounded-lg">
            <BsFillMenuButtonWideFill className="text-2xl" />
          </button>
          <span className="text-xl font-bold">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          {user && <FaUserCircle className="text-2xl text-blue-300" />}
          <button onClick={handleLogout} className="text-xs font-bold bg-red-500 px-3 py-1.5 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[70] lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[80] transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-[#18294B] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Menu</h2>
            <p className="text-xs text-blue-300 uppercase">Admin Control</p>
          </div>
          <button onClick={toggleSidebar} className="p-2 hover:bg-blue-800 rounded-full">
            <IoMdClose className="text-2xl" />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100%-120px)]">
          <ul className="space-y-1">
            {adminLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => handleMenuItemClick(link.path)}
                  className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-[#18294B] transition-all font-semibold border-b border-gray-50 text-left"
                >
                  <span className="text-2xl text-blue-600">{link.icon}</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="my-6 border-t border-gray-100"></div>
          <ul className="space-y-1">
            {sharedLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => handleMenuItemClick(link.path)}
                  className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-gray-500 hover:bg-gray-50 transition-all font-medium text-left"
                >
                  <span className="text-2xl text-gray-400">{link.icon}</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto mt-16 lg:mt-0 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;