import { useContext, useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, signOut } = useContext(AuthContext);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut();
      closeMenu();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userMenuItems = [
    { name: "Resort Directory", path: "/resort-directory" },
    { name: "Gateways", path: "/dashboard/gateways" },
    { name: "Exchange", path: "/dashboard/exchange" },
    { name: "Membership", path: "/dashboard/membership" },
    { name: "Cruises", path: "/dashboard/cruises" },
    { name: "Air Travel", path: "/dashboard/air-travel" },
    { name: "Car Rentals", path: "/dashboard/car-rentals" },
    { name: "My Account", path: "/dashboard/my-account" },
    { name: "My Bookings", path: "/dashboard/my-bookings" },
  ];

  const adminMenuItems = [
    { name: "Admin Panel", path: "/admin-panel/admin-overview" },
    { name: "Resort Directory", path: "/resort-directory" },
    { name: "Profile", path: "/profile" },
  ];

  const defaultMenuItems = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Create a Profile", path: "/create-profile" },
    { name: "Resort Directory", path: "/resort-directory" },
  ];

  const menuItems = user ? (role === "admin" ? adminMenuItems : userMenuItems) : defaultMenuItems;

  return (
    <header className="bg-[#18294B] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">interval</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-white text-xs xl:text-sm px-3 py-1.5 rounded-md transition-colors hover:bg-white/10 ${
                location.pathname === item.path ? 'bg-white/20' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3 ml-3 pl-3 border-l border-white/20">
              <FaUserCircle className="text-white text-2xl flex-shrink-0" />
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-1.5 rounded-md hover:bg-red-600 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-3 text-white bg-blue-600 px-5 py-1.5 rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Right */}
        <div className="lg:hidden flex items-center gap-3">
          {user && <FaUserCircle className="text-white text-2xl" />}
          <button onClick={toggleMenu} className="text-white p-1.5" aria-label="Menu">
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] lg:hidden" onClick={closeMenu} />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl z-[70] transform transition-transform duration-300 lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="bg-[#18294B] p-5 flex justify-between items-center">
          <span className="text-white text-xl font-bold">Menu</span>
          <button onClick={closeMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User info in sidebar */}
        {user && (
          <div className="px-5 py-4 bg-blue-50 border-b">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-[#18294B] text-3xl flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 truncate">{user.displayName || 'Member'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col overflow-y-auto h-[calc(100%-130px)]">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              onClick={closeMenu}
              className={`px-5 py-3.5 text-gray-700 hover:bg-blue-50 flex justify-between items-center border-b border-gray-100 text-sm ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600 font-medium' : ''
              }`}
            >
              <span>{item.name}</span>
              <IoIosArrowForward className="text-orange-500 flex-shrink-0" />
            </Link>
          ))}

          <div className="p-5 mt-auto">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-white bg-red-500 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block w-full text-center text-white bg-blue-600 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
