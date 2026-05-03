import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Gateways", path: "/dashboard/gateways" },
  { name: "Exchange", path: "/dashboard/exchange" },
  { name: "Membership", path: "/dashboard/membership" },
  { name: "Resort Directory", path: "/resort-directory" },
];

const NavbarOnDB = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();

  const handleNavClick = (item) => {
    setActiveItem(item);
    navigate(item.path);
  };

  return (
    <div className="bg-white text-black w-full sticky top-0 z-10">
      <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2 px-4 gap-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`whitespace-nowrap text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-all ${
              activeItem?.name === item.name
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }`}
            onClick={() => handleNavClick(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavbarOnDB;
