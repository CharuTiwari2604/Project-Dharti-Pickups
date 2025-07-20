// import { useAuth } from "./frontpage/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Navbar = () => {
//   const { user, setUser } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true });
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="p-4 flex justify-between items-center bg-green-600 text-white">
//       <h1 className="text-2xl font-bold">Dharti</h1>
//       <div>
//         {user ? (
//           <>
//             <span className="mr-4">Welcome, {user.name || user.username}</span>
//             <button onClick={handleLogout} className="bg-white text-green-600 px-4 py-2 rounded">Logout</button>
//           </>
//         ) : (
//           <button onClick={() => navigate("/login")} className="bg-white text-green-600 px-4 py-2 rounded">Login</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




//new
import React, { useState } from 'react';
import ConfirmLogoutModal from './confirmlogout';
import { useAuth } from "./frontpage/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // modal open/close

  // Only called if user confirms logout
  const handleConfirmLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true });
      setUser(null);
      setShowModal(false);
      navigate("/");
      alert("Successfully logged out!");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <nav className="p-4 flex justify-between items-center bg-green-600 text-white">
        <h1 className="text-2xl font-bold">Dharti</h1>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name || user.username}</span>
              <button
                onClick={() => setShowModal(true)} // only open modal
                className="bg-white text-green-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-600 px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {showModal && (
        <ConfirmLogoutModal
          onConfirm={handleConfirmLogout}   // logout only if confirmed
          onCancel={() => setShowModal(false)} // close modal otherwise
        />
      )}
    </>
  );
};

export default Navbar;
