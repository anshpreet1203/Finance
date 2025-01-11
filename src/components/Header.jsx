import { useEffect } from "react";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  function logoutFnc() {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <>
      <div className="bg-theme w-full py-5 px-3 sticky top-0 left-0 flex justify-between items-center z-50">
        <p className="text-xl text-white font-bold">Finance</p>
        {user && (
          <p
            onClick={logoutFnc}
            className="hover:text-white opacity-40 hover:opacity-80 cursor-pointer transition-all duration-300"
          >
            Logout
          </p>
        )}
      </div>
    </>
  );
};

export default Header;
