// import React, { useState } from "react";
// import "../index.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import bgreq from '../assets/bgreqpickup.jpg';

// export function RequestPickup() {
//     const [location, setLocation] = useState("");
//     const [type, setType] = useState("Plastic");
//     const [weight, setWeight] = useState("");
//     const [date, setDate] = useState("");
//     const [image, setImage] = useState(null);
//     const [loading, setLoading] = useState(false);

//     //extra for location
//     const [locationInput, setLocationInput] = useState("");
//     const [suggestions, setSuggestions] = useState([]);

//     const apiKey = import.meta.env.VITE_LOCATIONIQ_KEY;

//     const fetchSuggestions = async (query) => {
//         if (!query) {
//             setSuggestions([]);
//             return;
//         }
//         try {
//             const res = await fetch(
//                 `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json`
//             );
//             const data = await res.json();
//             setSuggestions(data);
//         } catch (err) {
//             console.error("Error fetching suggestions:", err);
//             setSuggestions([]);
//         }
//     };


//     const handleLocationChange = (e) => {
//         const value = e.target.value;
//         setLocationInput(value);
//         fetchSuggestions(value);
//     };

//     const handleSuggestionClick = (place) => {
//         // setLocationInput(place.display_place || place.display_name);
//         // setSuggestions([]);
//         const address = place.display_place || place.display_name;
//         setLocationInput(address);  // for input field
//         setLocation(address);       // ✅ for backend submission
//         setSuggestions([]);
//     };

//     //end

//     const navigate = useNavigate();

//     const saveRequest = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         // formData.append("location", location);
//         formData.append("location", location);
//         formData.append("type", type);
//         formData.append("weight", weight);
//         formData.append("date", date);
//         if (image) formData.append("image", image);

//         try {
//             setLoading(true);

//             const res = await axios.post(
//                 "http://localhost:5000/api/requestpickup/request",
//                 formData,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         // "Content-Type": "multipart/form-data",
//                     }
//                 }
//             );

//             alert(res.data.message || "Request sent successfully");

//             // Reset form
//             setLocation('');
//             setType('Plastic');
//             setWeight('');
//             setDate('');
//             setImage(null);

//             // Redirect to profile
//             navigate("/profile");
//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);
//             alert("Failed to send request.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="requestpickup" style={{ backgroundImage: `url(${bgreq})` }} >
//             <div className="box">
//                 <p className="heading">Request Waste Pickup</p>
//                 <form className="form" onSubmit={saveRequest}>
//                     <div>
//                         <label className="label2" htmlFor="location">Location</label>
//                         {/* <input className="textarea" type="text"  id="location" placeholder="Enter Location for Pickup"
//                             value={location} onChange={(e) => setLocation(e.target.value)} required /> */}

//                         {/* extra for location */}
//                         <input
//                             type="text"
//                             value={locationInput}
//                             onChange={handleLocationChange}
//                             placeholder="Enter your location"
//                             className="w-full border border-gray-300 rounded px-4 py-2"
//                         />
//                         {suggestions.length > 0 && (
//                             <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full shadow-md">
//                                 {suggestions.map((place, index) => (
//                                     <li
//                                         key={index}
//                                         className="p-2 hover:bg-gray-100 cursor-pointer"
//                                         onClick={() => handleSuggestionClick(place)}
//                                     >
//                                         {place.display_name}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                     {/* end */}
//                     <div className="inline">
//                         <div>
//                             <label className="label2" htmlFor="type">Waste Type</label>
//                             <select className="waste" id="type" value={type} onChange={(e) => setType(e.target.value)} required  >
//                                 <option>Plastic</option>
//                                 <option>Paper</option>
//                                 <option>Metal</option>
//                                 <option>Electronics</option>
//                             </select>
//                         </div>

//                         <div className="weight">
//                             <label className="label2" htmlFor="weight">Estimated Weight</label>
//                             <input className="waste" type="text" id="weight" placeholder="eg. 50Kg" value={weight}
//                                 onChange={(e) => setWeight(e.target.value)} required />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="label2" htmlFor="date">Preferred Pickup Date</label>
//                         <input className="waste" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//                     </div>

//                     <div>
//                         <label className="label2" htmlFor="image">Upload Image (optional)</label>
//                         <input className="fileinput" type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//                     </div>

//                     <button type="submit" disabled={loading}>
//                         {loading ? "Sending..." : "Send Request"}
//                     </button>
//                     {/* </div> */}
//                 </form>
//             </div >
//         </div >
//     );
// }





//revised
import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgreq from '../assets/bgreqpickup.jpg';

export function RequestPickup() {
    const [location, setLocation] = useState("");
    const [type, setType] = useState("Plastic");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [locationInput, setLocationInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const apiKey = import.meta.env.VITE_LOCATIONIQ_KEY;
    const navigate = useNavigate();

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(
                `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json`
            );
            const data = await res.json();
            setSuggestions(data);
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            setSuggestions([]);
        }
    };

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocationInput(value);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = (place) => {
        const address = place.display_place || place.display_name;
        setLocationInput(address);
        setLocation(address);  // Set correct backend location
        setSuggestions([]);
    };

    const saveRequest = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("location", location);
        formData.append("type", type);
        formData.append("weight", weight);
        formData.append("date", date);
        if (image) formData.append("image", image);

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:5000/api/requestpickup/request",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        // Content-Type is automatically set by Axios for FormData
                    },
                }
            );

            alert(res.data.message || "Request sent successfully");

            // Reset form
            setLocation('');
            setLocationInput('');
            setType('Plastic');
            setWeight('');
            setDate('');
            setImage(null);

            // Redirect to profile page
            navigate("/profile");
        } catch (error) {
            console.error("Error submitting request:", error.response?.data || error.message);
            alert("Failed to send request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="requestpickup" style={{ backgroundImage: `url(${bgreq})` }}>
            <div className="box">
                <p className="heading">Request Waste Pickup</p>
                <form className="form" onSubmit={saveRequest}>
                    <div>
                        <label className="label2" htmlFor="location">Location</label>
                        <input
                            type="text"
                            value={locationInput}
                            onChange={handleLocationChange}
                            placeholder="Enter your location"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            required
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full shadow-md">
                                {suggestions.map((place, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSuggestionClick(place)}
                                    >
                                        {place.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="inline">
                        <div>
                            <label className="label2" htmlFor="type">Waste Type</label>
                            <select
                                className="waste"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option>Plastic</option>
                                <option>Paper</option>
                                <option>Metal</option>
                                <option>Electronics</option>
                            </select>
                        </div>

                        <div className="weight">
                            <label className="label2" htmlFor="weight">Estimated Weight</label>
                            <input
                                className="waste"
                                type="text"
                                id="weight"
                                placeholder="eg. 50Kg"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label2" htmlFor="date">Preferred Pickup Date</label>
                        <input
                            className="waste"
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label2" htmlFor="image">Upload Image (optional)</label>
                        <input
                            className="fileinput"
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}
