import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const GoogleLoginSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://farm2home-backend-2qly.onrender.com/api/auth/google/success", {
          withCredentials: true,
        });
        const userData = res.data.user;

        // Store user info including profile picture (if available)
        login({
          name: userData.name,
          email: userData.email,
          profilePicture: userData.profilePicture || null,  // Optional profile picture
          role: "user",
        });

        navigate("/");
      } catch (err) {
        console.log("Google login failed", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [login, navigate]);

  return <div className="p-4">Logging you in...</div>;
};

export default GoogleLoginSuccess;
