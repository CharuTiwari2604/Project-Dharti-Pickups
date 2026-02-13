import React, { useEffect, useState } from "react";
import axios from '../api/axiosConfig';
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import Spinner from "./Spinner";
import "../index.css";
import { Award, Crown, User } from 'lucide-react';

const getLevel = (points) => {
  if (points >= 1000) return "Level 5";
  if (points >= 500) return "Level 4";
  if (points >= 300) return "Level 3";
  if (points >= 100) return "Level 2";
  return "Level 1";
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [ecopoints, setEcopoints] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "" });
  const [profileForm, setProfileForm] = useState({
    location: "",
    phone: "",
    bio: "",
  });
  const [profileComplete, setProfileComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/user/profile");
        setUser(res.data);
        setPickups(res.data.pickups || []);
        setIsAuthenticated(true);
         setEditForm({ name: res.data.name });
        setProfileForm({
          location: res.data.location || "",
          phone:res. data.phone || "",
          bio: res.data.bio || "",
        });
        setProfileComplete(!!(res.data.location && res.data.phone && res.data.bio));
        

        // Ecopoints
        const pointsRes = await axios.get("/user/ecopoints")
        setEcopoints(pointsRes.data.ecoPoints);

        // Leaderboard
        const leaderboardRes = await axios.get("/user/leaderboard")
        const leaderboardData=leaderboardRes.data.leaderboard || leaderboardRes.data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);

      } catch (err) {
        console.error("Error fetching profile:", err);
        setIsAuthenticated(false);
      }
      finally {
        setLoadingAuth(false);
      }
    };

    fetchData();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/user/profile", {name: editForm.name }),
        setUser((prev) => ({ ...prev, name: editForm.name }));
      setShowEditModal(false);
    } catch (err) {
      alert("Error updating username");
    }
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/user/profile", profileForm)
      setUser((prev) => ({ ...prev, ...profileForm }));
      setProfileComplete(true);
      setShowSetupModal(false);
    } catch (err) {
      alert("Error updating profile details");
    }
  };

  if (loadingAuth) {
    return (
      <div className="loading-screen" style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );
  }


  if (!isAuthenticated) {
    return (
      <div className="not-logged-in flex justify-center items-center h-screen bg-[#f5f5f5] px-4">
        <div className="not-logged-in-card bg-white py-8 px-6 md:px-12 rounded-[16px] shadow-[0_0_15px_rgba(0,0,0,0.1)] text-center w-full max-w-[600px] transition-all">
          <h2 className="mb-4 text-[#333] text-[24px] md:text-[32px] leading-tight">You're not logged in</h2>
          <p className="text-[#666] mb-8 mt-4 md:mt-[30px] text-[16px] md:text-[20px]">Please log in to view and manage your profile.</p>
          <Link to="/?login=true">
            <button className="go-login-btn bg-[#4caf50] text-white px-6 md:px-[1.2rem] py-2 md:py-[0.6rem] rounded-[8px] cursor-pointer text-[1rem] transition-colors duration-200 ease-linear hover:bg-[#388e3c]">Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profilepage relative block bg-[#e6eedd] p-8 pb-[100px]">
      
      {/* Ecopoints */}
      <div className="head2 text-[#0c3a1d] text-[45px] font-[700] relative text-center mt-[6px] underline">My Profile</div>
      <div className="ecobox p-3 rounded-lg shadow-lg bg-white text-center absolute right-4 top-4 sm:relative sm:top-0 sm:right-0 sm:mx-auto sm:mt-4 sm:w-auto  ">
  <h2 className="text-base sm:text-xl font-semibold mb-1">Ecopoints Earned</h2>
  <p className="text-2xl sm:text-4xl font-bold text-green-600">{ecopoints} 🌱</p>
  <p className="text-xs sm:text-sm text-gray-500 mt-1">{getLevel(ecopoints)}</p>
</div>

      <img className="avatar h-[370px] w-auto object-cover border-[4px] border-[#0d4f25] ml-[30px]" src={avatar} alt="avatar" width="100" style={{ borderRadius: "50%" }} />
      <div className="profileinfo absolute top-0 font-times text-[35px] ml-[550px] mt-[290px] mb-6">
        <p><strong>Username:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Location:</strong> {user.location || "Not set"}</p>
        <p><strong>Phone:</strong> {user.phone || "Not set"}</p>
        <p><strong>Bio:</strong> {user.bio || "Not set"}</p>
      </div>

      <button className="edit bg-[#26782c] px-5 py-[10px] rounded-[10px] text-white text-[20px] absolute right-0 top-0 mt-[600px] mr-[780px] cursor-pointer hover:bg-[#154d19]" onClick={() => setShowEditModal(true)}>Change Username</button>
      <button className="setprofile bg-[#26782c] px-7 py-[12px] rounded-[10px] text-white text-[20px] absolute right-0 top-0 mt-[600px] mr-[32rem] cursor-pointer hover:bg-[#154d19]" onClick={() => setShowSetupModal(true)} style={{ marginLeft: "10px" }}>
        {profileComplete ? "Edit" : "Set"} Profile
      </button>

      {/* Pickups */}
      <h3 className="head">Recent Pickups</h3>
      <div className="wastecard w-[1450px] mt-[30px] bg-white p-[1.2rem] rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.07)] mb-4 transition-all duration-300 border-2 border-[#eaeaea] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
        {pickups.length === 0 ? (
          <p>No waste data available.</p>
        ) : (
          pickups.map((pickup, i) => (
            <div key={i} className="pickup-card text-left bg-[#f9f9f9] border border-[#ddd] p-4 rounded-[8px]">
              <div className="cardhead flex justify-between items-center">
                <div className="location text-[1.3rem] font-[600] text-[#333]">
                  <p><strong>📍 Location:</strong> {pickup.location}</p>
                </div>
              </div>
              <div className="rowinfo flex justify-between items-center py-[0.3rem] text-[0.95rem] text-[#555]">
                <div className="wastetype mt-[0.3rem] text-[#555]">
                  <p><strong>🧺 Type:</strong> {pickup.type}</p>
                </div>
                <div className="weight mt-[0.3rem] text-[#555]">
                  <p><strong> ⚖️ Weight:</strong> {pickup.weight}Kg</p>
                </div>
                <div className="date mt-[0.3rem] text-[#555]">
                  <p>📅 Date: {new Date(pickup.date).toLocaleDateString()}</p>
                </div>
              </div>
              {pickup.imageUrl && (
                <img src={pickup.imageUrl} alt="Uploaded" width="200" style={{ marginTop: "10px" }} />
              )}
              <div className="flex justify-end">
                {pickup.points ? (
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                    +{pickup.points} Ecopoints earned
                  </span>
                ) : (
                  <span className="text-sm text-gray-400 italic">Calculating points...</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showEditModal && (
        <div className="modal-overlay fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-[1000]">
          <div className="modal bg-white p-8 rounded-[8px] w-[300px] text-center">
            <h3>Change Username</h3>
            <form onSubmit={handleEditSubmit}>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
              <button className="btn2 cursor-pointer" type="submit">Save</button>
              <button className="btn2 cursor-pointer" type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showSetupModal && (
        <div className="modal-overlay fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-[1000]">
          <div className="modal bg-white p-[1.5rem] rounded-[10px] w-[320px] shadow-[0_4px_8px_rgba(0,0,0,0.3)] text-center">
            <h3>{profileComplete ? "Edit" : "Set"} Profile Details</h3>
            <form onSubmit={handleSetupSubmit}>
              <input type="text" placeholder="Enter your Location" value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} />
              <input type="text" placeholder="Enter your Phone no." value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
              <textarea placeholder="Set your Bio" value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} />
              <button className="btn2 cursor-pointer" type="submit">Save</button>
              <button className="btn2 cursor-pointer" type="button" onClick={() => setShowSetupModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white shadow-lg rounded-2xl mt-10 p-6">
        <div className="bg-green-600 text-white p-4 rounded-t-xl flex justify-between items-center">
          <Crown size={24} />
          <h2 className="text-xl font-bold">Top Performers</h2>
          <Award size={24} />
        </div>
        <table className="w-full mt-4">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3 px-4 text-center">RANK</th>
              <th className="py-3 px-4 text-center">USER</th>
              <th className="py-3 px-4 text-center">POINTS</th>
              <th className="py-3 px-4 text-center">LEVEL</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id} className="border-b text-center">
                <td className="py-3 px-2 font-semibold">
                  {index === 0 ? <Crown className="text-yellow-500 mx-auto" size={20} /> : `#${index + 1}`}
                </td>
                <td className="py-3 px-6 flex items-center justify-center gap-2">
                  <User className="text-gray-500" size={20} />
                  <span>{entry.name}</span>
                </td>
                <td className="py-3 px-2">
                  <Award className="inline text-blue-500 mr-1" size={16} />
                  {entry.ecoPoints}
                </td>
                <td className="py-3 px-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${entry.ecoPoints >= 1000 ? 'bg-purple-100 text-purple-700'
                    : entry.ecoPoints >= 500 ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                     }`}>        
                                  {/* ≥1000=purple badge, ≥500=yellow badge, otherwise=gray badge */}
                    {getLevel(entry.ecoPoints)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;


