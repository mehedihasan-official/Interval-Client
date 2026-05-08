import { useState } from "react";
import bannerPhoto from "../../assets/images/getaways-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import SingleDestination from "../../components/GatewayTabContent/SingleDestination";
import SearchAllDestinations from "../../components/GatewayTabContent/SearchAllDestinations";
import ResortNameOrCode from "../../components/GatewayTabContent/ResortNameOrCode";
// Removed unused import of ResortDirectory since "Area List" now redirects

const Gateways = () => {
  const [activeTab, setActiveTab] = useState("Getaways");
  const [activeMenu, setActiveMenu] = useState("Single Destination");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "ShortStay Getaways") {
      setActiveMenu(null);
    }
  };

  const handleMenuClick = (menu) => {
    if (menu === "Area List") {
      navigate("/resort-directory");
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <div>
        <img src={bannerPhoto} alt="Banner" className="w-full" />
      </div>

      <div className="p-4 w-full md:w-11/12 lg:w-10/12 max-w-7xl">
        {/* Title and Subtitle */}
        <div className="mt-6 px-2">
          <h1 className="text-left text-2xl font-bold text-blue-700 sm:text-3xl lg:text-4xl">
            Search Getaways
          </h1>
          <p className="text-left text-gray-600 font-bold mt-1 text-sm sm:text-base">
            Take More Vacations At Irresistibly Low Prices
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-row items-center justify-center mt-6 px-2">
          {["Getaways", "ShortStay Getaways"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-xs sm:text-sm font-bold border-2 py-3 transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
              } ${tab === "Getaways" ? "rounded-s-md" : "rounded-e-md"}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Submenu Section */}
        {activeTab === "Getaways" && (
          <div className="w-full mt-6 px-2">
            <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-blue-600 rounded-md overflow-hidden">
              {[
                "Single Destination",
                "Search All Destinations",
                "Resort Name or Code",
                "Area List",
              ].map((menu) => (
                <button
                  key={menu}
                  className={`py-3 px-2 font-medium text-[10px] sm:text-xs text-center border-b md:border-b-0 md:border-r last:border-0 ${
                    activeMenu === menu
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 bg-white hover:bg-blue-50"
                  }`}
                  onClick={() => handleMenuClick(menu)}
                >
                  {menu}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "Getaways" && (
          <div className="mt-8">
            {activeMenu === "Single Destination" && <SingleDestination />}
            {activeMenu === "Search All Destinations" && <SearchAllDestinations />}
            {activeMenu === "Resort Name or Code" && <ResortNameOrCode />}
          </div>
        )}

        {/* Additional Links */}
        <div className="w-full mt-10">
          {[
            { label: "Top Getaway Deals", path: "/dashboard/gateways" },
            { label: "Best Price Guarantee", path: "/dashboard/gateways" }
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex border-t-2 p-3 font-semibold text-gray-600 hover:bg-blue-100 items-center justify-between"
            >
              <h1>{item.label}</h1>
              <IoIosArrowForward className="text-yellow-600 font-bold text-xl" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gateways;
