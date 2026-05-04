import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, signOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Logged-in nav tabs
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

  // Pre-login desktop nav tabs (matching the screenshot)
  const preLoginNavTabs = [
    { name: "Why Vacation Ownership?", path: "#" },
    { name: "Explore & Plan", path: "#" },
    { name: "Membership Benefits", path: "#" },
    { name: "Join Today", path: "#" },
  ];

  // Mobile menu items for pre-login
  const mobilePreLoginItems = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Create a Profile", path: "/create-profile" },
    { name: "Resort Directory", path: "/resort-directory" },
  ];

  const loggedInMobileItems = user
    ? role === "admin"
      ? adminMenuItems
      : userMenuItems
    : mobilePreLoginItems;

  return (
    <>
      {/* ── TOP LANGUAGE BAR (desktop only) ── */}
      {!user && (
        <div className="hidden md:flex justify-end items-center bg-[#f2f2f2] px-4 py-1.5 border-b border-gray-300">
          <div className="max-w-[980px] mx-auto w-full flex justify-end items-center">
            <span className="text-gray-700 text-xs mr-2 font-medium">
              Language:
            </span>
            <select className="text-xs bg-white border border-gray-300 rounded px-2 py-0.5 text-gray-700 outline-none">
              <option>English</option>
            </select>
          </div>
        </div>
      )}

      {/* ── MAIN HEADER ── */}
      <header className="bg-white sticky top-0 z-50">
        {/* Logo + Auth row (desktop) */}
        {!user && (
          <div className="hidden md:block w-full bg-white">
            <div className="max-w-[980px] mx-auto grid grid-cols-12 items-center">
              {/* Image part (Maximum) */}
              <div className="col-span-9">
                <Link to="/">
                  <img
                    src="/desktop-header-part.png"
                    alt="Interval Logo"
                    className="h-[100px] object-contain object-left"
                  />
                </Link>
              </div>

              {/* Buttons part (Minimum) */}
              <div className="col-span-3 flex justify-center items-center gap-2 pr-4">
                <Link
                  to="/create-profile"
                  className="text-[#1a6fa8] text-xs hover:underline font-medium"
                >
                  Create Profile
                </Link>
                <Link
                  to="/login"
                  className="bg-[#0077be] text-white text-sm font-bold px-6 py-2 rounded hover:bg-[#005a8e] transition shadow-sm"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}

        {user && (
          <div className="hidden md:flex items-center justify-between px-4 py-2 max-w-[980px] mx-auto">
            <Link to="/">
              <img
                src="/Interval50-Pub.svg"
                alt="Interval 50 Years"
                className="h-14"
              />
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-5 py-1.5 rounded text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Desktop nav tabs (matching screenshot) */}
        <nav className="hidden md:flex bg-[#18294B]">
          <div className="max-w-[980px] mx-auto w-full flex">
            {user
              ? (role === "admin" ? adminMenuItems : userMenuItems).map(
                  (item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`text-white text-xs px-4 py-3 hover:bg-white/10 transition border-r border-white/10 last:border-r-0 ${
                        location.pathname === item.path ? "bg-white/20" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  ),
                )
              : preLoginNavTabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.path}
                    className="flex-1 text-center text-white text-sm py-2.5 border-r border-white/20 last:border-r-0 hover:bg-white/10 transition font-medium"
                  >
                    {tab.name}
                  </a>
                ))}
          </div>
        </nav>

        {/* ── MOBILE HEADER ── */}
        <div className="md:hidden flex items-center justify-between px-3 py-2 bg-[#18294B]">
          <Link to="/">
            <img
              src="/Interval50-Pub.svg"
              alt="Interval 50 Years"
              className="h-8"
            />
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white p-1.5"
            aria-label="Menu"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl z-[70] transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-[#18294B] p-5 flex justify-between items-center">
          <img src="/Interval50-Pub.svg" alt="Interval" className="h-8" />
          <button onClick={closeMenu} className="text-white">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col overflow-y-auto h-[calc(100%-70px)]">
          {loggedInMobileItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              onClick={closeMenu}
              className={`px-5 py-3.5 text-gray-700 hover:bg-blue-50 flex justify-between items-center border-b border-gray-100 text-sm ${
                location.pathname === item.path
                  ? "bg-blue-50 text-[#1a6fa8] font-medium"
                  : ""
              }`}
            >
              <span>{item.name}</span>
              <IoIosArrowForward className="text-[#1a6fa8] flex-shrink-0" />
            </Link>
          ))}

          <div className="p-5 mt-auto">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-white bg-red-500 py-3 rounded-lg font-bold hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block w-full text-center text-white bg-[#1a6fa8] py-3 rounded-lg font-bold hover:bg-[#155a8a] transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
