import React, { useEffect, useState } from "react";
import axios from "axios";
import { Crown, User, Award } from "lucide-react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leaderboard", {
          withCredentials: true,
        });
        setLeaderboard(res.data); // Ensure your backend sends an array
        console.log("Leaderboard Data:", res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, []);

  const getLevel = (points) => {
    if (points >= 10000) return "Level 3";
    if (points >= 7000) return "Level 2";
    return "Level 1";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800 flex items-center justify-center gap-2">
        <Crown className="text-yellow-500" />
        Top Performers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center border">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 font-semibold">
              <th className="py-3 px-4 border ">Rank</th>
              <th className="py-3 px-4 border ">User</th>
              <th className="py-3 px-4 border ">Points</th>
              <th className="py-3 px-4 border ">Level</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <tr
                  key={user._id || index}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-2 px-4 font-medium text-yellow-700">
                    {index === 0 ? (
                      <Crown className="mx-auto text-yellow-500" />
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td className="py-2 px-4 flex items-center justify-center gap-2 text-gray-800">
                    <User className="text-gray-500" />
                    {user.name}
                  </td>
                  <td className="py-2 px-4 text-blue-700 flex items-center justify-center gap-1">
                    <Award size={16} />
                    {user.ecoPoints}
                  </td>
                  <td className="py-2 px-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      {getLevel(user.ecoPoints)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-gray-500">
                  No users found with more than 4000 ecoPoints.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
