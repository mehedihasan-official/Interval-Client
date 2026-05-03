import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allResortData, setAllResortData] = useState([]);
  const [email, setEmail] = useState(null);
  const [userData, setUserData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [role, setRole] = useState(null);
  const [allBookingsData, setAllBookingsData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [paymentInfoData, setPaymentInfoData] = useState({});

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const showAlert = (title, icon = "success") => {
    Swal.fire({
      title,
      icon,
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
    });
  };

  const createProfile = async (allData) => {
    const {
      membership,
      phone,
      userID,
      email,
      password,
      name = "New User",
    } = allData;

    if (!email || !password) {
      showAlert("Email and Password are required", "error");
      return { success: false, message: "Email and Password are required" };
    }

    setLoading(true);
    try {
      const checkUserEmailUrl = `${import.meta.env.VITE_server_API}/users/email=${email}`;
      const userEmailExistsResponse = await fetch(checkUserEmailUrl);

      if (userEmailExistsResponse.status === 200) {
        showAlert("Email already registered", "error");
        return { success: false, message: "Email already registered" };
      } else if (userEmailExistsResponse.status !== 404) {
        throw new Error("Failed to check email existence");
      }

      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userProfileData = {
        name,
        userId: userID,
        email,
        membership,
        telephone: phone,
      };

      const backendResponse = await fetch(
        `${import.meta.env.VITE_server_API}/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userProfileData),
        },
      );

      if (!backendResponse.ok) {
        throw new Error("Failed to send user data to backend");
      }

      setEmail(email);
      showAlert("Profile created successfully", "success");

      return { success: true };
    } catch (error) {
      console.error("Error creating profile:", error.message);
      showAlert(error.message || "Something went wrong", "error");
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchUserByEmail = async (email) => {
    if (!email) {
      console.error("Email is required to fetch user data");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_server_API}/users?email=${email}`,
      );
      setUserData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data || error);
    }
  };

  // Set User Role
  const setUserRole = async (email) => {
    if (!email) return; // Exit if email is not available

    try {
      const response = await fetch(
        `${import.meta.env.VITE_server_API}/users?email=${email}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data from backend");
      }
      const userData = await response.json();

      if (userData.isAdmin) {
        setRole("admin");
      } else {
        setRole("user");
      }
    } catch (error) {
      console.error("Error setting user role:", error.message);
      setRole(null); // Reset role if there's an error
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { displayName, email } = result.user;

      const checkUserUrl = `${import.meta.env.VITE_server_API}/users?email=${email}`;
      const userExistsResponse = await fetch(checkUserUrl);

      if (!userExistsResponse.ok && userExistsResponse.status !== 404) {
        throw new Error("Failed to check if user exists");
      }

      if (userExistsResponse.status === 404) {
        await fetch(`${import.meta.env.VITE_server_API}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: displayName, email }),
        });
      }

      setEmail(email);
      showAlert("Successfully Logged In with Google");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(email);
      showAlert("Successfully Signed In");
    } catch (error) {
      console.error("Error signing in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setEmail(null);
      showAlert("Successfully Signed Out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    if (!import.meta.env.VITE_server_API) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_server_API}/all-users`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch users: ${response.status} ${response.statusText}`,
        );
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Received non-JSON response from server. Check if API URL is correct.",
        );
      }
      const data = await response.json();
      setAllUsers(data);
      setAllUsersData(data);
    } catch (error) {
      console.error("Error fetching all users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (email, isAdmin) => {
    try {
      // Validate input
      if (!email || typeof isAdmin !== "boolean") {
        throw new Error("Email and isAdmin status are required");
      }

      // Send PATCH request to update user role
      const response = await fetch(
        `${import.meta.env.VITE_server_API}/update-user`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, isAdmin }),
        },
      );

      // Handle response
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error updating user role: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      // Parse updated user data
      const updatedUser = await response.json();

      // Update state with the updated user
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => (user.email === email ? updatedUser : user)),
      );
      setAllUsersData((prevUsers) =>
        prevUsers.map((user) => (user.email === email ? updatedUser : user)),
      );

      // Show success message
      showAlert("User role updated successfully", "success");
    } catch (error) {
      console.error("Error updating user role:", error.message);
      showAlert(
        error.message || "Failed to update user role. Please try again later.",
        "error",
      );
    }
  };

  const fetchAllResorts = async () => {
    if (!import.meta.env.VITE_server_API) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_server_API}/resort-data`,
      );
      if (!response.ok)
        throw new Error(`Error fetching resorts: ${response.statusText}`);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from server.");
      }
      const data = await response.json();
      setAllResortData(data);
    } catch (error) {
      console.error("Error fetching all resort data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings data based on user's email
  const fetchBookingsData = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_server_API}/bookings?email=${email}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching bookings data: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      setBookingsData(data);
    } catch (error) {
      console.error("Error fetching bookings data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment information
  const fetchPaymentInformation = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_server_API}/bookings?email=${email}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching payment information: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setPaymentInfoData(data[0]); // Assuming the first object in the array is the needed payment info
      } else {
        setPaymentInfoData({});
      }
    } catch (error) {
      console.error("Error fetching payment information:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all Booking Data
  const fetchAllBookingsData = async () => {
    if (!import.meta.env.VITE_server_API) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_server_API}/all-bookings`,
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching all resort data: ${response.status} ${response.statusText}`,
        );
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from server.");
      }
      const data = await response.json();
      setAllBookingsData(data);
    } catch (error) {
      console.error("Error fetching all resort data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserByEmail(email);
      setUserRole(email);
    }
  }, [email]);

  useEffect(() => {}, [role]);

  useEffect(() => {
    fetchAllResorts();
    fetchAllUsers();
    fetchAllBookingsData();
    if (email) {
      fetchUserByEmail(email);
      setUserRole(email);
      fetchBookingsData(email);
      fetchPaymentInformation(email);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        setEmail(currentUser.email);
        setUserRole(currentUser.email);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [email]);

  const authInfo = {
    loading,
    user,
    role,
    allUsers,
    allBookingsData,
    bookingsData,
    paymentInfoData,
    allResortData,
    email,
    allUsersData,
    userData,
    updateUser,
    setUser,
    fetchAllResorts,
    fetchAllUsers,
    createProfile,
    login,
    signOut,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
