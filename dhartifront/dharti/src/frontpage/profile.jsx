import React, { useEffect, useState } from "react";
import axios from '../api/axiosConfig';
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
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
  // const [user, setUser] = useState({});
  
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [ecopoints, setEcopoints] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ NEW
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
        // Profile
        const res = await axios.get("/user/profile", { withCredentials: true });
        const data = res.data;
        setUser(data);
        setPickups(data.pickups || []);
        setEditForm({ name: data.name });
        setProfileForm({
          location: data.location || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });
        setProfileComplete(!!(data.location && data.phone && data.bio));
        setIsAuthenticated(true);

        // Ecopoints
        const pointsRes = await axios.get("/user/ecopoints", { withCredentials: true });
        setEcopoints(pointsRes.data.ecopoints);

        // Leaderboard
        const leaderboardRes = await axios.get("/leaderboard", { withCredentials: true });
        setLeaderboard(leaderboardRes.data);

      } catch (err) {
        console.error("Error fetching profile:", err);
        setIsAuthenticated(false);
      }
      // extra 
      finally {
        setLoading(false); // ✅ Ensure it always stops loading
      }
    };

    fetchData();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/user/profile", { username: editForm.name }, { withCredentials: true });
      setUser((prev) => ({ ...prev, name: editForm.name }));
      setShowEditModal(false);
    } catch (err) {
      alert("Error updating username");
    }
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/user/profile", profileForm, { withCredentials: true });
      setUser((prev) => ({ ...prev, ...profileForm }));
      setProfileComplete(true);
      setShowSetupModal(false);
    } catch (err) {
      alert("Error updating profile details");
    }
  };

  // ✅ Handle loading state first
  if (loading) {
  return (
    <div className="loading-spinner">
      <p>Loading profile...</p>
    </div>
  );
}

  if (!isAuthenticated) {
    return (
      <div className="not-logged-in">
        <div className="not-logged-in-card">
          <h2>You're not logged in</h2>
          <p>Please log in to view and manage your profile.</p>
          <Link to="/?login=true">
            <button className="go-login-btn">Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profilepage">
      {/* Ecopoints */}
      <div className="head2">My Profile</div>
      {/* <div className="bg-white shadow-md rounded-2xl p-6 mt-0"> */}
      <div className="ecobox">
        <h2 className="text-2xl font-bold mb-2">Ecopoints Earned</h2>
        <p className="text-4xl font-bold text-green-600">{ecopoints} 🌱 </p>
        <p className="text-sm text-gray-500 mt-1">{getLevel(ecopoints)}</p>
      </div>

      <img className="avatar" src={avatar} alt="avatar" width="100" style={{ borderRadius: "50%" }} />
      <div className="profileinfo">
        <p><strong>Username:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Location:</strong> {user.location || "Not set"}</p>
        <p><strong>Phone:</strong> {user.phone || "Not set"}</p>
        <p><strong>Bio:</strong> {user.bio || "Not set"}</p>
      </div>

      <button className="edit" onClick={() => setShowEditModal(true)}>Change Username</button>
      <button className="setprofile" onClick={() => setShowSetupModal(true)} style={{ marginLeft: "10px" }}>
        {profileComplete ? "Edit" : "Set"} Profile
      </button>

      {/* Pickups */}
      <h3 className="head">Recent Pickups</h3>
      <div className="wastecard">
        {pickups.length === 0 ? (
          <p>No waste data available.</p>
        ) : (
          pickups.map((pickup, i) => (
            <div key={i} className="pickup-card">
              <div className="cardhead">
                <div className="location">
                  <p><strong>📍 Location:</strong> {pickup.location}</p>
                </div>
              </div>
              <div className="rowinfo">
                <div className="wastetype">
                  <p><strong>🧺 Type:</strong> {pickup.type}</p>
                </div>
                <div className="weight">
                  <p><strong> ⚖️ Weight:</strong> {pickup.weight}Kg</p>
                </div>
                <div className="date">
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
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Username</h3>
            <form onSubmit={handleEditSubmit}>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
              <button className="btn2" type="submit">Save</button>
              <button className="btn2" type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showSetupModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{profileComplete ? "Edit" : "Set"} Profile Details</h3>
            <form onSubmit={handleSetupSubmit}>
              <input type="text" placeholder="Enter your Location" value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} />
              <input type="text" placeholder="Enter your Phone no." value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
              <textarea placeholder="Set your Bio" value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} />
              <button className="btn2" type="submit">Save</button>
              <button className="btn2" type="button" onClick={() => setShowSetupModal(false)}>Cancel</button>
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
