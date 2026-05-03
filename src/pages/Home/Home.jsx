import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Content from "./Content/Content";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role) {
      // Check if the user is an admin
      if (role === "admin") {
        navigate("/admin-panel/admin-overview");
      } else {
        navigate("/dashboard/gateways");
      }
    }
  }, [user, role, navigate]);

  return (
    <div className="">
      {!user && (
        <>
          <Carousel />
          <Content />
        </>
      )}
    </div>
  );
};

export default Home;